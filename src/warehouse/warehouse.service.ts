import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWarehouseDto: CreateWarehouseDto) {
    try {
      return await this.prisma.warehouse.create({
        data: {
          ...createWarehouseDto,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error creating warehouse: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.warehouse.findMany();
    } catch (error) {
      throw new HttpException(
        `Error fetching warehouses: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const warehouse = await this.prisma.warehouse.findUnique({
        where: { id },
      });

      if (!warehouse) {
        throw new HttpException('Warehouse not found', HttpStatus.NOT_FOUND);
      }

      return warehouse;
    } catch (error) {
      throw new HttpException(
        `Error fetching warehouse: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    try {
      const warehouse = await this.prisma.warehouse.findUnique({
        where: { id },
      });

      if (!warehouse) {
        throw new HttpException('Warehouse not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.warehouse.update({
        where: { id },
        data: {
          ...updateWarehouseDto,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error updating warehouse: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const warehouse = await this.prisma.warehouse.findUnique({
        where: { id },
      });

      if (!warehouse) {
        throw new HttpException('Warehouse not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.warehouse.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error deleting warehouse: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
