import { Module } from "@nestjs/common";
import { DetailsService } from "./details.service";
import { DetailsController } from "./details.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [DetailsController],
  providers: [DetailsService, PrismaService, ConfigService],
})
export class DetailsModule {}
