import { Controller, Post, Body, Get, UseGuards, Param, ParseIntPipe, Put, Delete, Patch } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/createSale.dto';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { ChangeExpiryDto, ChangeSaleDateDto } from './dto/changeDate.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createSale(@Body() body: CreateSaleDto){
    return this.salesService.createSale(body);
  }

  @UseGuards(JwtGuard)
  @Get('all')
  async getAllSales(){
    return this.salesService.getAllSales();
  }

  @UseGuards(JwtGuard)
  @Get(':productId')
  async getSaleByProductId(@Param('productId', ParseIntPipe) productId: number){
    return this.salesService.getSaleByProductId(productId);
  }

  @UseGuards(JwtGuard)
  @Patch('changePercent/:id')
  async changeSalesPercent(@Param('id', ParseIntPipe) id: number, @Body() body: {salesPercent: number}){
    return this.salesService.changeSalesPercent(id, body.salesPercent);
  }

  @UseGuards(JwtGuard)
  @Patch('changeExpiry/:id')
  async changeExpiryDate(@Param('id', ParseIntPipe) id: number, @Body() body: ChangeExpiryDto){
    return this.salesService.changeExpiryDate(id, body.expiryDate);
  }

  @UseGuards(JwtGuard)
  @Patch('changeDate/:id')
  async changeSale(@Param('id', ParseIntPipe) id: number, @Body() body: ChangeSaleDateDto){
    return this.salesService.changeSaleDate(id, body.saleDate);
  }

  @UseGuards(JwtGuard)
  @Delete('remove/:id')
  async removeSale(@Param('id', ParseIntPipe) id: number){
    return this.salesService.deleteSale(id);
  }
}
