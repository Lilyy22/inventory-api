import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerFinishedProductDto } from './create-customer-finished-product.dto';

export class UpdateCustomerFinishedProductDto extends PartialType(CreateCustomerFinishedProductDto) {}
