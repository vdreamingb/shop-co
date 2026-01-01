import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/createSale.dto';
import { Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
@Injectable()
export class SalesService {
    private readonly logger = new Logger(SalesService.name, { timestamp: true})

    constructor(private readonly prismaService: PrismaService){}

    private handleError(error: unknown): never {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                this.logger.error('Sale not found');
                throw new NotFoundException('Sale not found');
            }
        }
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(message, error instanceof Error ? error.stack : undefined);
        throw new InternalServerErrorException('Something went wrong');
    }

    async createSale(data: CreateSaleDto){
        this.logger.log("Creating sale");
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
        this.logger.log("Fetching all sales");
        return await this.prismaService.sales.findMany();
    }

    async getSaleByProductId(productId: number){
        try {
            this.logger.log("Fetching sale by product ID");
            return await this.prismaService.sales.findFirst({
            where: {
                productId,
            }
            });
        } catch (error) {
            this.handleError(error);
        }
    }

    async changeSalesPercent(id: number, salesPercent: number){
        try {
            this.logger.log("Changing sales percent");
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
            this.handleError(error);
        }
    }

    async changeExpiryDate(id: number, expiryDate: Date){
        try {
            this.logger.log("Changing expiry date");
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
            this.handleError(error);
        }
    }

    async changeSaleDate(id: number, saleDate: Date){
        try {
            this.logger.log("Changing sale start date");
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
            this.handleError(error);
        }
    }

    async deleteSale(id: number){
        try {
            this.logger.log("Deleting sale");
            return await this.prismaService.sales.delete({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            this.handleError(error);
        }
    }
}
