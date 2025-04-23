import { Module } from '@nestjs/common';
import { CustomerFinishedProductService } from './customer-finished-product.service';
import { CustomerFinishedProductController } from './customer-finished-product.controller';

@Module({
  controllers: [CustomerFinishedProductController],
  providers: [CustomerFinishedProductService],
})
export class CustomerFinishedProductModule {}
