import { Controller, ParseIntPipe, Post, Param, Body, UseGuards, Get, Put, Delete, Patch } from '@nestjs/common';
import { DetailsService } from './details.service';
import { createDetailsDto } from './dto/createDetails.dto';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { ModifyDetailsDto } from './dto/modifyDetails.dto';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async createDetails(@Body() body:createDetailsDto){
    return this.detailsService.createDetails(body)
  }

  @UseGuards(JwtGuard)
  @Get('all')
  async getAllDetails(){
    return this.detailsService.getAllDetails()
  }

  @UseGuards(JwtGuard)
  @Get(':productId')
  async getDetailsByProductId(@Param('productId', ParseIntPipe) productId: number){
    return this.detailsService.getDetailsByProductId(productId)
  }

  @UseGuards(JwtGuard)
  @Patch('modifyColor/:id')
  async modifyProductColor(@Param('id', ParseIntPipe) id: number, @Body() body: {color: string}){
    return this.detailsService.modifyProductColor(body.color, id)
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async deleteDetails(@Param('id', ParseIntPipe) id: number){
    return this.detailsService.deleteProductDetails(id)
  }
  
  @UseGuards(JwtGuard)
  @Patch('modifyStock/:id')
  async modifyStock(@Param('id', ParseIntPipe) id: number, @Body() body: {stock: number}){
    return this.detailsService.modifyStock(id, body.stock)
  }

  @UseGuards(JwtGuard)
  @Patch('modifyInfo/:id')
  async modifyProductInfo( @Param('id', ParseIntPipe) id: number, @Body() body: ModifyDetailsDto){
    return this.detailsService.modifyProductInfo(id, body.style, body.type, body.pricePercent, body.stock)
  }

  @UseGuards(JwtGuard)
  @Delete("delete/:id")
  async deleteProductDetails(@Param('id', ParseIntPipe) id: number){
    return this.detailsService.deleteProductDetails(id)
  }
}
