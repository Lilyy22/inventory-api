import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { LoginDto } from './dto/LoginDto.dto';
import { userBody } from 'src/user/dto/userBody.dto';
import { PrismaService } from 'prisma/prisma.service';
import { refreshTokenDto } from './dto/refreshTokenDto.dto';

interface CustomRequest extends Request {
  user: any; // Type the user object based on what you are attaching to it
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate JWT token user
  async validateJwtUser(payload: any) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: payload.sub,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    return {
      userId: user.id,
      role: user.role,
      name: user.name,
    };
  }

  // Validate user credentials (username and password)
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOne(email);
      if (user && bcrypt.compareSync(password, user.password)) {
        return user; // Return user if valid
      }
      throw new BadRequestException('Invalid credentials');
    } catch (err) {
      throw new BadRequestException('Invalid credentials');
    }
    // return null; // Return null if invalid
  }

  async signup(userdetail: userBody, res: Response): Promise<any> {
    try {
      const user = await this.userService.create(
        userdetail.email,
        userdetail.password,
      );
      const payload = {
        role: user.role,
        sub: user.id,
        name: user.name,
      };

      const token = this.tokens(payload, res);
      return { token: token, user: user };
    } catch (err) {
      throw err;
    }
  }

  async login(loginDto: LoginDto, res: Response) {
    try {
      const user = await this.userService.findOne(loginDto.email);

      const payload = {
        role: user.role,
        sub: user.id,
        name: user.name,
      };

      return this.tokens(payload, res);
    } catch (err) {
      throw err;
    }
  }

  // logout clear http cookie
  async logout(res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  }

  // update access token from the cookie on the request
  async refreshToken(refreshToken: refreshTokenDto, res: Response) {
    // const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken.refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    try {
      // Step 1: Verify the refresh token
      const payload = this.jwtService.verify(refreshToken.refreshToken);

      // Step 2: Extract user ID from the payload
      const userId = payload.sub;

      // Step 3: Retrieve the user’s hashed refresh token from the database
      const tokenEntry = await this.getRefreshToken(userId);

      if (!tokenEntry) {
        throw new UnauthorizedException('No token entry found');
      }
      // Step 4: Compare the hashed token with the one in the cookie
      const isMatch = await bcrypt.compare(
        refreshToken.refreshToken,
        tokenEntry.refresh_token,
      );

      if (!isMatch) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      // Destructure and exclude `iat` and `exp`
      const { iat, exp, ...cleanedPayload } = payload;

      return this.tokens(cleanedPayload, res);
    } catch (error) {
      throw error;
    }
  }

  // Validate JWT token user
  async tokens(payload, res: Response) {
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d', // Refresh token expiration (e.g., 7 days)
    });

    // res.cookie('refreshToken', refresh_token, {
    //   httpOnly: true,
    //   secure: true, // Use only with HTTPS
    //   sameSite: 'none', // Mitigate CSRF
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    //   path: '/',
    // });

    await this.addRefreshToken(payload.sub, refresh_token);
    // Explicitly return a JSON response
    return res.status(200).json({
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token,
      user: payload,
    });
  }

  async getRefreshToken(userId) {
    try {
      return await this.prismaService.refreshTokens.findFirst({
        where: { user_id: userId },
      });
    } catch (err) {
      return err;
    }
  }

  async addRefreshToken(userId: number, token) {
    try {
      const hashedToken = await bcrypt.hash(token, 10);

      return await this.prismaService.refreshTokens.upsert({
        where: { user_id: userId },
        update: { refresh_token: hashedToken },
        create: { user_id: userId, refresh_token: hashedToken }, // If no record exists, create a new one with user_id and refresh_token
      });
    } catch (err) {
      return err;
    }
  }

  async getMe(req: CustomRequest) {
    try {
      return req.user;
    } catch (err) {
      return err;
    }
  }
}
