import { Module } from '@nestjs/common';
import { ExpediationsService } from './expediations.service';
import { ExpediationsController } from './expediations.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ExpediationsController],
  providers: [ExpediationsService, PrismaService, AuthService, JwtService],
})
export class ExpediationsModule {}
