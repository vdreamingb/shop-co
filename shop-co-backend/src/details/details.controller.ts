import { Controller, ParseIntPipe, Post, Param, Body, UseGuards, Get, Put, Delete, Patch } from '@nestjs/common';
import { DetailsService } from './details.service';
import { CreateDetailsDto } from './dto/createDetails.dto';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { ModifyDetailsDto } from './dto/modifyDetails.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/roles.enum';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Post('create')
  async createDetails(@Body() body:CreateDetailsDto){
    return this.detailsService.createDetails(body)
  }


  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
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
  @Roles(RoleEnum.ADMIN)
  @Patch('modifyColor/:id')
  async modifyProductColor(@Param('id', ParseIntPipe) id: number, @Body() body: {color: string}){
    return this.detailsService.modifyProductColor(body.color, id)
  }
  
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Patch('modifyStock/:id')
  async modifyStock(@Param('id', ParseIntPipe) id: number, @Body() body: {stock: number}){
    return this.detailsService.modifyStock(id, body.stock)
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)  
  @Patch('modifyInfo/:id')
  async modifyProductInfo( @Param('id', ParseIntPipe) id: number, @Body() body: ModifyDetailsDto){
    return this.detailsService.modifyProductInfo(id, body.style, body.type, body.pricePercent, body.stock)
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Delete("delete/:id")
  async deleteProductDetails(@Param('id', ParseIntPipe) id: number){
    return this.detailsService.deleteProductDetails(id)
  }
}
