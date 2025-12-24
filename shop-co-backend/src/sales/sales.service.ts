import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/createSale.dto';

@Injectable()
export class SalesService {
    constructor(private readonly prismaService: PrismaService){}

    async createSale(data: CreateSaleDto){
        return await this.prismaService.sales.create({
            data: {
                id: data.id,
                productId: data.productId,
                salesPercent: data.salesPercent,
                saleDate: data.saleDate,
                expiryDate: data.expiryDate,
            },
        });
    }

    async getAllSales(){
        return await this.prismaService.sales.findMany();
    }

    async getSaleByProductId(productId: number){
        return await this.prismaService.sales.findFirst({
            where: {
                productId,
            }
        });
    }

    async changeSalesPercent(id: number, salesPercent: number){
        try {
            return await this.prismaService.sales.update({
                where: {
                    id,
                },
                data: {
                    salesPercent,
                },  
            });
        }
        catch (error) {
            return error.message;
        }
    }

    async changeExpiryDate(id: number, expiryDate: Date){
        try {
            return await this.prismaService.sales.update({
                where: {
                    id,
                },
                data: {
                    expiryDate,
                },  
            });
        }
        catch (error) {
            return error.message;
        }
    }

    async changeSaleDate(id: number, saleDate: Date){
        try {
            return await this.prismaService.sales.update({
                where: {
                    id,
                },
                data: {
                    saleDate,
                },  
            });
        }
        catch (error) {
            return error.message;
        }
    }

    async deleteSale(id: number){
        try {
            return await this.prismaService.sales.delete({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            return error.message;
        }
    }
}
