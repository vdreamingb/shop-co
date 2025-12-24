import { Module } from '@nestjs/common';
import { ExpediationsService } from './expediations.service';
import { ExpediationsController } from './expediations.controller';

@Module({
  controllers: [ExpediationsController],
  providers: [ExpediationsService],
})
export class ExpediationsModule {}
