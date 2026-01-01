import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDetailsDto } from "./dto/createDetails.dto";
import { Logger } from "@nestjs/common";
import { InternalServerErrorException, NotFoundException} from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class DetailsService {
  private readonly logger = new Logger(DetailsService.name, { timestamp: true})

  constructor(private readonly prismaService: PrismaService) {}

  private handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        this.logger.error('Product details not found');
        throw new NotFoundException('Product details not found');
      }
    }
    const message = error instanceof Error ? error.message : String(error);
    this.logger.error(message, error instanceof Error ? error.stack : undefined);
    throw new InternalServerErrorException('Something went wrong');
  }

  async createDetails(data: CreateDetailsDto) {
    try {
      this.logger.log("Creating product details");
      return await this.prismaService.productDetails.create({
        data: {
          productId: data.productId,
          color: data.color,
          size: data.size,
          gender: data.gender,
          style: data.style,
          type: data.type,
          stock: data.stock,
          pricePercent: data.pricePercent,
        },
    });
    } catch (error) {
      this.handleError(error);
    }
    
  }

  async modifyProductColor(color: string, id: number) {
    try {
      this.logger.log("Modifying product color");
      return await this.prismaService.productDetails.update({
        where: {
          id,
        },
        data: {
          color,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async modifyProductInfo(
    id: number,
    style: string | undefined,
    type: string | undefined,
    pricePercent: number,
    stock: number
  ) {
    try {
      this.logger.log("Modifying product info");
      return await this.prismaService.productDetails.update({
        where: {
          id: id,
        },
        data: {
          style: style,
          type: type,
          pricePercent: pricePercent,
          stock: stock,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async modifyStock(id: number, stock: number) {
    try {
      this.logger.log("Modifying product stock");
      return await this.prismaService.productDetails.update({
        where: {
          id,
        },
        data: {
          stock,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteProductDetails(id: number) {
    try {
      this.logger.log("Deleting product details");
      const response = await this.prismaService.productDetails.delete({
        where: {
          id,
        },
      });
      return "Details deteled successfully";
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllDetails() {
    try {
      this.logger.log("Fetching all product details");
      const response = await this.prismaService.productDetails.findMany();
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getDetailsByProductId(productId: number) {
    try {
      this.logger.log("Fetching details by product ID");
      const response = await this.prismaService.productDetails.findMany({
        where: {
          productId,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
}
