import {
  IsString,
  IsEnum,
  IsDate,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DeliveryFreq } from 'src/enums';

export class CreateCustomerOrderDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  order_number: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsEnum(DeliveryFreq)
  deliveryFrequency: DeliveryFreq;

  @IsNumber()
  totalquantity: number;

  @IsString()
  status: string;

  @IsString()
  customer_id: string;

  @IsString()
  created_by: string;

  @IsString()
  updated_by: string;
}
