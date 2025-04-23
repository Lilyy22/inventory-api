import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomerFinishedProductService } from './customer-finished-product.service';
import { CreateCustomerFinishedProductDto } from './dto/create-customer-finished-product.dto';
import { UpdateCustomerFinishedProductDto } from './dto/update-customer-finished-product.dto';

@Controller('customer-finished-product')
export class CustomerFinishedProductController {
  constructor(
    private readonly customerFinishedProductService: CustomerFinishedProductService,
  ) {}

  @Post()
  async create(
    @Body() createCustomerFinishedProductDto: CreateCustomerFinishedProductDto,
  ) {
    try {
      return await this.customerFinishedProductService.create(
        createCustomerFinishedProductDto,
      );
    } catch (error) {
      throw new HttpException(
        `Error creating finished product: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.customerFinishedProductService.findAll();
    } catch (error) {
      throw new HttpException(
        `Error fetching finished products: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.customerFinishedProductService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerFinishedProductDto: UpdateCustomerFinishedProductDto,
  ) {
    try {
      return await this.customerFinishedProductService.update(
        id,
        updateCustomerFinishedProductDto,
      );
    } catch (error) {
      throw new HttpException(
        `Error updating finished product: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.customerFinishedProductService.remove(id);
    } catch (error) {
      throw new HttpException(
        `Error deleting finished product: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
