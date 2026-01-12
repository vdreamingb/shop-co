import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ExpediationsService } from './expediations.service';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/roles.enum';
import { CreateExpediationsDto } from './dto/createExped.dto';

@Controller('expediations')
export class ExpediationsController {
  constructor(private readonly expediationsService: ExpediationsService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('all')
  async getAllExpediations() {
    return this.expediationsService.all();
  }

  @UseGuards(JwtGuard)
  @Post('create/:userId')
  async createExpediation(@Param('userId', ParseIntPipe) userId: number, @Body() data: CreateExpediationsDto) {
    return this.expediationsService.create(userId,data);
  }

  @UseGuards(JwtGuard)
  @Get(':expeditionId')
  async getExpediationById(@Param('expeditionId', ParseIntPipe) expeditionId: number) {
    return this.expediationsService.getByExpediationId(expeditionId);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('user/:userId')
  async getExpediationsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.expediationsService.getByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @Patch('modifyStatus/:id')
  async modifyStatus(@Param('id', ParseIntPipe) id: number, @Body() body: {status: boolean}) {
    return this.expediationsService.modifyStatus(id, body.status)
  }
}