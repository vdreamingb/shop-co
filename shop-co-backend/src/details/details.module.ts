import { Module } from "@nestjs/common";
import { DetailsService } from "./details.service";
import { DetailsController } from "./details.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [DetailsController],
  providers: [DetailsService, PrismaService],
})
export class DetailsModule {}
