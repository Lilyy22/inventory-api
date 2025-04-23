import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gurads/local-auth.guard';
import { refreshTokenDto } from './dto/refreshTokenDto.dto';
import { SignupDto } from './dto/SignupDto';
import { JwtAuthGuard } from './gurads/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    try {
      // console.log('req.user', req.user);
      return await this.authService.login(req.user, res);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // @UseGuards(LocalAuthGuard)
  @Post('signup')
  async signup(@Body() userdetail: SignupDto, @Res() res: Response) {
    try {
      return await this.authService.signup(userdetail, res);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Post('refreshToken')
  async refreshToken(
    @Body() refreshTokenDto: refreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      return await this.authService.refreshToken(refreshTokenDto);
    } catch (error) {
      // Check if the error is an instance of an HTTP exception
      const message =
        error.response?.message || error.message || 'An error occurred';
      res.status(error.status || 400).json({ message });
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    try {
      return this.authService.getMe(req.user, res);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // @Get('logout')
  // @UseGuards(JwtAuthGuard)
  // logout clear http cookie
  // async logout(res: Response) {
  //   res.clearCookie('refreshToken', {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'strict',
  //   });
  //   return res.status(200).json({ message: 'Logged out successfully' });
  // }
}
