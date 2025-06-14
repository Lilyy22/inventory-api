import { IsNotEmpty, MinLength, Matches } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'Email must be a valid email address',
  })
  email: string; // This holds only a valid email

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
