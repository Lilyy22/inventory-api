import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { refreshTokenDto } from './dto/refreshTokenDto.dto';
import { SignupDto } from './dto/SignupDto';
import { EmailService } from 'src/email/email.service';
import { TwilioService } from 'src/twilio/twilio.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly twilioService: TwilioService,
  ) {}

  // Validate JWT token user JWT GUARD
  async validateJwtUser(payload: any) {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    return user;
  }

  // Validate user credentials by email for LOCLAUTH GUARD
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOne(email);
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log('user', user);
        return user; // Return user if valid
      }
      throw new BadRequestException('Invalid credentials');
    } catch (err) {
      throw err;
    }
  }

  async signup(userdetail: SignupDto, res: Response): Promise<any> {
    try {
      const hashedPass = await bcrypt.hash(userdetail.password, 10);
      const user = await this.userService.create({
        ...userdetail,
        password: hashedPass,
      });

      res
        .status(201)
        .json({ message: 'We have send a verification email.', user: user });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // login user after checking the credential with passport localAuth Guard
  async login(user: any, res: Response) {
    try {
      // Ensure isActive is not false (it can be null)
      const isActive = user.isActive !== false;

      if (!isActive) {
        throw new Error('Deactivated Account!');
      }

      const payload = {
        role: user.role,
        sub: user.id,
      };

      const token = await this.tokens(payload);
      res.status(201).json({ token: token, user: user });
    } catch (err) {
      throw err;
    }
  }

  // Authenticated user details
  async getMe(user: any, res: Response) {
    try {
      const userDetail = await this.userService.findById(user.id);
      res.status(201).json({ user: userDetail });
    } catch (err) {
      throw err;
    }
  }

  // update access token from the cookie on the request
  async refreshToken(refreshTokenDto: refreshTokenDto) {
    // const refreshToken = req.cookies['refreshToken'];
    if (!refreshTokenDto.refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    try {
      // Step 1: Verify the refresh token
      const payload = this.jwtService.verify(refreshTokenDto.refreshToken);

      // Step 2: Extract user ID from the payload
      const userId = payload.sub;

      // Step 3: Retrieve the user’s hashed refresh token from the database
      const tokenEntry = await this.getRefreshToken(userId);

      if (!tokenEntry) {
        throw new UnauthorizedException('No token entry found');
      }

      // Step 4: Compare the hashed token with the one in the cookie
      const isMatch = await bcrypt.compare(
        refreshTokenDto.refreshToken,
        tokenEntry.refreshToken,
      );
      console.log(isMatch, 'matching is done');

      if (!isMatch) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      // Destructure and exclude `iat` and `exp`
      const { iat, exp, ...cleanedPayload } = payload;

      return this.tokens(cleanedPayload);
    } catch (error) {
      throw error;
    }
  }

  // Validate JWT token user
  async tokens(payload: any) {
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d', // Refresh token expiration (e.g., 7 days)
    });

    try {
      await this.addRefreshToken(payload.sub, refresh_token);
      // Explicitly return a JSON response
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: refresh_token,
      };
    } catch (err) {
      throw err;
    }
  }

  async getRefreshToken(userId: string) {
    try {
      return await this.prismaService.refreshTokens.findFirst({
        where: { userId: userId },
      });
    } catch (err) {
      return err;
    }
  }

  async addRefreshToken(userId: string, token: any) {
    try {
      const hashedToken = await bcrypt.hash(token, 10);

      return await this.prismaService.refreshTokens.upsert({
        where: { userId: userId },
        update: { refreshToken: hashedToken },
        create: { userId: userId, refreshToken: hashedToken }, // If no record exists, create a new one with user_id and refresh_token
      });
    } catch (err) {
      return err;
    }
  }
}
