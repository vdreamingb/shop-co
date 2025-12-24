import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { R2Service } from "src/r2/r2.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, R2Service, ConfigService],
})
export class ProductsModule {}
