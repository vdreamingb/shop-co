import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpediationsDto } from './dto/createExped.dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class ExpediationsService {
    private readonly logger = new Logger(ExpediationsService.name, { timestamp: true});

    constructor(private readonly prismaService: PrismaService){}

    handleError(error: unknown): never {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                this.logger.error('Product details not found');
                throw new NotFoundException('Product details not found');
            }
        }
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(message, error instanceof Error ? error.stack : undefined);
        throw new Error('Internal Server Error');
    }

    async create(id: number, data: CreateExpediationsDto){
        try {
            this.logger.log("Creating expedition");
            let cost:number = 0
            data.items.map((item) => {
                const itemCost = item.quantity * item.unitPrice
                cost+=itemCost
            })

            return await this.prismaService.expediations.create({
                data: {
                    userId: id,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    cost: cost,
                    items: { create: data.items }
                }
            })
        } catch (error) {
            this.handleError(error);
        }
    }

    async all(){
        this.logger.log("Fetching all expediations")
        return await this.prismaService.expediations.findMany()
    }

    async getByExpediationId(id: number){
        try {
            this.logger.log("Fetching expediation by ID")
            return await this.prismaService.expediations.findFirst({
                where:{
                    id
                }
            })
        } catch (error) {
            this.handleError(error);
        }
    }

    async getByUserId(userId: number){
        try {
            this.logger.log("Fetching all expediations by user ID")
            return this.prismaService.expediations.findFirst({
                where:{
                    userId
                }
            })
        } catch (error) {
            this.handleError(error)
        }
    }

    async modifyStatus(id: number, status: boolean){
        try {
            this.logger.log("Modifying product status")
            await this.prismaService.expediations.update({
                where: {
                    id
                },
                data: {
                    status
                }
            })
            this.logger.log("Status updated")
            return "Status updated"
        } catch (error) {
            this.handleError(error)
        }
    }

    async deleteExpediation(id: number){
        try {
            this.logger.log("Deleting expediation")
            await this.prismaService.expediations.delete({
                where:{
                    id
                }
            })
            this.logger.log("Expediation deleted")
            return "Expediation deleted"
        } catch (error) {
            this.handleError(error)
        }
    }
}