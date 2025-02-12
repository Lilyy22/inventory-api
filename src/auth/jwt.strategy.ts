// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      secretOrKey: process.env.JWT_SECRET || 'secret', // The JWT secret
    });
  }

  async validate(payload: any) {
    const userpayload = await this.authService.validateJwtUser(payload);
    if (!userpayload) {
      throw new UnauthorizedException('Invalid token');
    }
    return userpayload; // This is attached to req.user
  }
}
