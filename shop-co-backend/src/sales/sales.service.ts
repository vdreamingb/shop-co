import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/createSale.dto';

@Injectable()
export class SalesService {
    constructor(private readonly prismaService: PrismaService){}

    async createSale(data: CreateSaleDto){
        return await this.prismaService.sales.create({
            data: {
                productId: data.productId,
                salesPercent: data.salesPercent,
                saleDate: new Date(data.saleDate),
                expiryDate: new Date(data.expiryDate),
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
                    expiryDate: new Date(expiryDate),
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
                    saleDate: new Date(saleDate),
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
