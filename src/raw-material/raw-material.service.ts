import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';

@Injectable()
export class RawMaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRawMaterialDto: CreateRawMaterialDto) {
    try {
      return await this.prisma.rawMaterial.create({
        data: {
          ...createRawMaterialDto,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error creating raw material: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.rawMaterial.findMany();
    } catch (error) {
      throw new HttpException(
        `Error fetching raw materials: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const material = await this.prisma.rawMaterial.findUnique({
        where: { id },
      });

      if (!material) {
        throw new HttpException('Raw material not found', HttpStatus.NOT_FOUND);
      }

      return material;
    } catch (error) {
      throw new HttpException(
        `Error fetching raw material: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateRawMaterialDto: UpdateRawMaterialDto) {
    try {
      const material = await this.prisma.rawMaterial.findUnique({
        where: { id },
      });

      if (!material) {
        throw new HttpException('Raw material not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.rawMaterial.update({
        where: { id },
        data: {
          ...updateRawMaterialDto,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error updating raw material: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const material = await this.prisma.rawMaterial.findUnique({
        where: { id },
      });

      if (!material) {
        throw new HttpException('Raw material not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.rawMaterial.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error deleting raw material: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
