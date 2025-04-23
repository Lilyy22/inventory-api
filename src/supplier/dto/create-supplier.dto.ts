import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => Object) // Assuming JSON type
  contacts: Record<string, any>;

  @ValidateNested()
  @Type(() => Object)
  address: Record<string, any>;

  @IsString()
  created_by: string;

  @IsString()
  updated_by: string;
}
