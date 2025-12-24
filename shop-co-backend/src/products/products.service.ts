import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { R2Service } from "src/r2/r2.service";
import type { Multer } from "multer";

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly r2Service: R2Service
  ) {}

  async getAll() {
    return await this.prismaService.product.findMany();
  }
  async create(data: any, file: Multer.File) {
    const imageUrl = await this.r2Service.uploadImg(
      file.buffer,
      file.originalname
    );

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
    try {
      await this.prismaService.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error.message);
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
      console.log(error.message);
    }

    return modifiedData;
  }

  async getProductById(id: number) {
    return await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }
}
