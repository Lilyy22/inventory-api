import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCustomerFinishedProductDto } from './dto/create-customer-finished-product.dto';
import { UpdateCustomerFinishedProductDto } from './dto/update-customer-finished-product.dto';

@Injectable()
export class CustomerFinishedProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCustomerFinishedProductDto: CreateCustomerFinishedProductDto,
  ) {
    try {
      return await this.prisma.customerFinishedProduct.create({
        data: {
          ...createCustomerFinishedProductDto,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error creating finished product: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.customerFinishedProduct.findMany();
    } catch (error) {
      throw new HttpException(
        `Error fetching finished products: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.customerFinishedProduct.findUnique({
        where: { id },
      });

      if (!product) {
        throw new HttpException(
          'Finished product not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return product;
    } catch (error) {
      throw new HttpException(
        `Error fetching finished product: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateCustomerFinishedProductDto: UpdateCustomerFinishedProductDto,
  ) {
    try {
      const product = await this.prisma.customerFinishedProduct.findUnique({
        where: { id },
      });

      if (!product) {
        throw new HttpException(
          'Finished product not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.prisma.customerFinishedProduct.update({
        where: { id },
        data: {
          ...updateCustomerFinishedProductDto,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error updating finished product: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.customerFinishedProduct.findUnique({
        where: { id },
      });

      if (!product) {
        throw new HttpException(
          'Finished product not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.prisma.customerFinishedProduct.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error deleting finished product: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
