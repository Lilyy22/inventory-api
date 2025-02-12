import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class userBody {
  @IsNotEmpty()
  @IsString()
  name: String;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
