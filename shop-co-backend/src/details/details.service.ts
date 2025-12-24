import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { createDetailsDto } from "./dto/createDetails.dto";
import { response } from "express";

@Injectable()
export class DetailsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDetails(data: createDetailsDto) {
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
  }

  async modifyProductColor(color: string, id: number) {
    try {
      return await this.prismaService.productDetails.update({
        where: {
          id,
        },
        data: {
          color,
        },
      });
    } catch (error) {
      return error.message;
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
      return error.message;
    }
  }

  async modifyStock(id: number, stock: number) {
    try {
      return await this.prismaService.productDetails.update({
        where: {
          id,
        },
        data: {
          stock,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async deleteProductDetails(id: number) {
    try {
      const response = await this.prismaService.productDetails.delete({
        where: {
          id,
        },
      });
      return "Details deteled successfully";
    } catch (error) {
      return error.message;
    }
  }

  async getAllDetails() {
    try {
      const response = await this.prismaService.productDetails.findMany();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async getDetailsByProductId(productId: number) {
    try {
      const response = await this.prismaService.productDetails.findMany({
        where: {
          productId,
        },
      });
      return response;
    } catch (error) {
      return error.message;
    }
  }
}
