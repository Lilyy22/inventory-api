import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';

@Injectable()
export class CustomerOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerOrderDto: CreateCustomerOrderDto) {
    try {
      return await this.prisma.customerOrder.create({
        data: {
          ...createCustomerOrderDto,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error creating customer order: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.customerOrder.findMany();
    } catch (error) {
      throw new HttpException(
        `Error fetching customer orders: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.prisma.customerOrder.findUnique({
        where: { id },
      });

      if (!order) {
        throw new HttpException(
          'Customer order not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return order;
    } catch (error) {
      throw new HttpException(
        `Error fetching customer order: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateCustomerOrderDto: UpdateCustomerOrderDto) {
    try {
      const order = await this.prisma.customerOrder.findUnique({
        where: { id },
      });

      if (!order) {
        throw new HttpException(
          'Customer order not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.prisma.customerOrder.update({
        where: { id },
        data: {
          ...updateCustomerOrderDto,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error updating customer order: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const order = await this.prisma.customerOrder.findUnique({
        where: { id },
      });

      if (!order) {
        throw new HttpException(
          'Customer order not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.prisma.customerOrder.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error deleting customer order: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
