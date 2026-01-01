import { Controller, Post, Body, Get, UseGuards, Param, ParseIntPipe, Put, Delete, Patch } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/createSale.dto';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { ChangeExpiryDto, ChangeSaleDateDto } from './dto/changeDate.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/roles.enum';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
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

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Patch('changePercent/:id')
  async changeSalesPercent(@Param('id', ParseIntPipe) id: number, @Body() body: {salesPercent: number}){
    return this.salesService.changeSalesPercent(id, body.salesPercent);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Patch('changeExpiry/:id')
  async changeExpiryDate(@Param('id', ParseIntPipe) id: number, @Body() body: ChangeExpiryDto){
    return this.salesService.changeExpiryDate(id, body.expiryDate);
  }

  @UseGuards(JwtGuard,RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Patch('changeDate/:id')
  async changeSale(@Param('id', ParseIntPipe) id: number, @Body() body: ChangeSaleDateDto){
    return this.salesService.changeSaleDate(id, body.saleDate);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Delete('delete/:id')
  async deleteSale(@Param('id', ParseIntPipe) id: number){
    return this.salesService.deleteSale(id);
  }
}
