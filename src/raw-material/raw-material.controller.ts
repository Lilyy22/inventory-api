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
import { RawMaterialService } from './raw-material.service';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';

@Controller('raw-material')
export class RawMaterialController {
  constructor(private readonly rawMaterialsService: RawMaterialService) {}

  @Post()
  async create(@Body() createRawMaterialDto: CreateRawMaterialDto) {
    try {
      return await this.rawMaterialsService.create(createRawMaterialDto);
    } catch (error) {
      throw new HttpException(
        `Error creating raw material: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.rawMaterialsService.findAll();
    } catch (error) {
      throw new HttpException(
        `Error fetching raw materials: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.rawMaterialsService.findOne(id);
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
    @Body() updateRawMaterialDto: UpdateRawMaterialDto,
  ) {
    try {
      return await this.rawMaterialsService.update(id, updateRawMaterialDto);
    } catch (error) {
      throw new HttpException(
        `Error updating raw material: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.rawMaterialsService.remove(id);
    } catch (error) {
      throw new HttpException(
        `Error deleting raw material: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
