import { IsNotEmpty, IsString, Length } from 'class-validator';

export class refreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
