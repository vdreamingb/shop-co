import { Controller, Get, Patch, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ExpediationItemsService } from './expediation-items.service';
import { UpdateItemDto } from './dto/update.dto';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/roles.enum';

@Controller('expediation-items')
export class ExpediationItemsController {
  constructor(private readonly expediationItemsService: ExpediationItemsService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('all')
  async getAllItems(){
    return this.expediationItemsService.getAll()
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Patch('modify/:id')
  async updateItem(@Param("id", ParseIntPipe) id,@Body() body: UpdateItemDto){
    return this.expediationItemsService.modify(id, body)
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get(":expediationId")
  async getByExpediationId(@Param("expediationId", ParseIntPipe) expediationId){
    return this.expediationItemsService.getByExpediationId(expediationId)
  }
}
