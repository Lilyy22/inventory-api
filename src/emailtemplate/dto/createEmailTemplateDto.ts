import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmailTemplateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsString()
  footer: string;
}
