import { Module } from '@nestjs/common';
import { ExpediationItemsService } from './expediation-items.service';
import { ExpediationItemsController } from './expediation-items.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExpediationItemsController],
  providers: [ExpediationItemsService, PrismaService],
})
export class ExpediationItemsModule {}
