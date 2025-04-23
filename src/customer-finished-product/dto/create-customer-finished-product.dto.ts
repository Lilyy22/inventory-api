import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DeliveryStatus } from 'src/enums';

export class CreateCustomerFinishedProductDto {
  @IsString()
  id: string;

  @IsString()
  sku: string;

  @IsNumber()
  quantity: number;

  @IsString()
  measurement: string;

  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @IsDate()
  @Type(() => Date)
  expiration_date: Date;

  @IsDate()
  @Type(() => Date)
  deliveryDate: Date;

  @IsString()
  order_id: string;

  @IsString()
  created_by: string;

  @IsString()
  updated_by: string;
}
