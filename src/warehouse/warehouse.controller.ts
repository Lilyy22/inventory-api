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
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehousesService: WarehouseService) {}

  @Post()
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    try {
      return await this.warehousesService.create(createWarehouseDto);
    } catch (error) {
      throw new HttpException(
        `Error creating warehouse: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.warehousesService.findAll();
    } catch (error) {
      throw new HttpException(
        `Error fetching warehouses: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.warehousesService.findOne(id);
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
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    try {
      return await this.warehousesService.update(id, updateWarehouseDto);
    } catch (error) {
      throw new HttpException(
        `Error updating warehouse: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.warehousesService.remove(id);
    } catch (error) {
      throw new HttpException(
        `Error deleting warehouse: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
