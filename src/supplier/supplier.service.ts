import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto) {
    try {
      return await this.prisma.supplier.create({
        data: {
          ...createSupplierDto,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error creating supplier: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.supplier.findMany();
    } catch (error) {
      throw new HttpException(
        `Error fetching suppliers: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const supplier = await this.prisma.supplier.findUnique({
        where: { id },
      });

      if (!supplier) {
        throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
      }

      return supplier;
    } catch (error) {
      throw new HttpException(
        `Error fetching supplier: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    try {
      const supplier = await this.prisma.supplier.findUnique({
        where: { id },
      });

      if (!supplier) {
        throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.supplier.update({
        where: { id },
        data: {
          ...updateSupplierDto,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error updating supplier: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const supplier = await this.prisma.supplier.findUnique({
        where: { id },
      });

      if (!supplier) {
        throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.supplier.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error deleting supplier: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
