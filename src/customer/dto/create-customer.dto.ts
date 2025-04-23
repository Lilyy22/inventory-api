import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => Object) // Assuming JSON type
  contacts: Record<string, any>;

  @ValidateNested()
  @Type(() => Object) // Assuming JSON type
  address: Record<string, any>;

  @IsBoolean()
  status: boolean;

  @IsString()
  created_by: string;

  @IsString()
  updated_by: string;
}
