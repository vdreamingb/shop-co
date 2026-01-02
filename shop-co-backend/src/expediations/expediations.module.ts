import { Module } from '@nestjs/common';
import { ExpediationsService } from './expediations.service';
import { ExpediationsController } from './expediations.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [ExpediationsController],
  providers: [ExpediationsService, PrismaService],
})
export class ExpediationsModule {}
