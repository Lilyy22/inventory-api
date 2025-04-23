import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRawMaterialDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  unique_code: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  current_quantity: number;

  @IsString()
  measurement: string;

  @IsNumber()
  price: number;

  @IsOptional()
  expiration_date?: Date;

  @IsOptional()
  shipment_date?: Date;

  @IsString()
  storage: string;

  @IsString()
  warehouse_id: string;

  @IsString()
  supplier_id: string;

  @IsString()
  created_by: string;

  @IsString()
  updated_by: string;
}
