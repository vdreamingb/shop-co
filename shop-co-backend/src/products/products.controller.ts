import { Controller, Post, UseInterceptors, Body, UploadedFile, Get, UseGuards, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateModifyDto } from './dto/createModify.dto';
import type { Multer } from 'multer';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/roles.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(@Body() body: CreateModifyDto, @UploadedFile() file: Multer.File) {
    return this.productsService.create(body, file)
  }

  @UseGuards(JwtGuard)
  @Get('all')
  async getAllProducts(){
      return this.productsService.getAll()
  }

  @UseGuards(JwtGuard,RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Put('modify/:id')
  async modifyProductData(@Body() body:CreateModifyDto, @Param('id', ParseIntPipe) id:number){
    return this.productsService.modifyProduct(id, body.name, body.price, body.brand, body.description)
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Delete('delete/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number){
    return this.productsService.deleteProduct(id)
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number){
    return this.productsService.getProductById(id)
  }
}
