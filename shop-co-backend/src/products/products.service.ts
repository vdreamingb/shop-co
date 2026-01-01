import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { R2Service } from "src/r2/r2.service";
import type { Multer } from "multer";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name, { timestamp: true})

  constructor(
    private readonly prismaService: PrismaService,
    private readonly r2Service: R2Service
  ) {}

  private handleError(error: unknown): never {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          this.logger.error('Product not found');
          throw new NotFoundException('Product not found');
        }
      }
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(message, error instanceof Error ? error.stack : undefined);
      throw new InternalServerErrorException('Something went wrong');
  }

  async getAll() {
    this.logger.log("Fetching all products");
    return await this.prismaService.product.findMany();
  }

  async create(data: any, file: Multer.File) {
    
    const imageUrl = await this.r2Service.uploadImg(
      file.buffer,
      file.originalname
    );

    if(!imageUrl) {
      this.logger.warn("Image upload failed");
      throw new Error("Image upload failed");
    }

    return await this.prismaService.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        brand: data.brand,
        imageUrl: imageUrl,
      },
    });
  }

  async deleteProduct(id: number) {
    this.logger.log("Deleting product");
    try {
      await this.prismaService.product.delete({
        where: {
          id,
        },
      });
      this.logger.log("Product deleted successfully");
    } catch (error) {
      this.handleError(error);
    }
    return "Product deleted";
  }

  async modifyProduct(
    id: number,
    name: string,
    price: number,
    brand: string | undefined,
    description: string | undefined
  ) {
    this.logger.log("Modifying product");
    let modifiedData: any;
    try {
      modifiedData = await this.prismaService.product.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          price,
          brand,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
    this.logger.log("Product modified successfully");
    return modifiedData;
  }

  async getProductById(id: number) {
    this.logger.log("Fetching product by ID");
    try {
      this.logger.log("Product fetched successfully");
      return await this.prismaService.product.findUnique({
        where: {
          id,
        },
      }); 
    } catch (error) {
      this.handleError(error);
    }
  }
}
