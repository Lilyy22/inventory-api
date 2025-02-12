import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { userBody } from 'src/user/dto/userBody.dto';
import { LocalAuthGuard } from './gurads/local-auth.guard';
import { Response, Request } from 'express';
import { LoginDto } from './dto/LoginDto.dto';
import { refreshTokenDto } from './dto/refreshTokenDto.dto';
import { JwtAuthGuard } from './gurads/jwt-auth.guard';

interface CustomRequest extends Request {
  user: any; // Type the user object based on what you are attaching to it
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      return await this.authService.login(loginDto, res);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @Post('signup')
  async signup(@Body() userdetail: userBody, @Res() res: Response) {
    try {
      return await this.authService.signup(userdetail, res);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @Post('refreshToken')
  async refreshToken(
    @Body() refreshToken: refreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      return await this.authService.refreshToken(refreshToken, res);
    } catch (error) {
      // Check if the error is an instance of an HTTP exception
      const message =
        error.response?.message || error.message || 'An error occurred';

      res.status(error.status || 400).json({ message });
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: CustomRequest) {
    return this.authService.getMe(req);
  }
}
