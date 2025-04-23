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
import { CustomerOrderService } from './customer-order.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';

@Controller('customer-order')
export class CustomerOrderController {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @Post()
  async create(@Body() createCustomerOrderDto: CreateCustomerOrderDto) {
    try {
      return await this.customerOrderService.create(createCustomerOrderDto);
    } catch (error) {
      throw new HttpException(
        `Error creating customer order: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.customerOrderService.findAll();
    } catch (error) {
      throw new HttpException(
        `Error fetching customer orders: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.customerOrderService.findOne(id);
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
    @Body() updateCustomerOrderDto: UpdateCustomerOrderDto,
  ) {
    try {
      return await this.customerOrderService.update(id, updateCustomerOrderDto);
    } catch (error) {
      throw new HttpException(
        `Error updating customer order: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.customerOrderService.remove(id);
    } catch (error) {
      throw new HttpException(
        `Error deleting customer order: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
