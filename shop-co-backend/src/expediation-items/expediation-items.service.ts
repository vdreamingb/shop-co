import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ExpediationItemsService {
    constructor(private readonly prismaService: PrismaService){}
    private readonly logger = new Logger(ExpediationItemsService.name, {timestamp: true})

    private handleError(error: unknown): never {
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(
          message,
          error instanceof Error ? error.stack : undefined,
        );
        throw new InternalServerErrorException("Something went wrong");
    }

    async getAll(){
        this.logger.log("Fetching all the expediations items")
        try {
            const data = this.prismaService.expeditionItem.findMany()
            return data
        } catch (error) {
            this.handleError(error)
        }
    }

    async modify(id:number, data: Partial<{detailsId:number,quantity:number}>){
        this.logger.log("Changing item info")
        try {
            return this.prismaService.expeditionItem.update(
                {
                    where: {
                        id
                    },
                    data
                }
            ) 
        } catch (error) {
            this.handleError(error)
        }
    }

    async getByExpediationId(expediationId: number){
        this.logger.log("Fetching Expediation items by id")
        try {
            const data = await this.prismaService.expeditionItem.findMany({
                where: {
                    expediationId
                }
            })
            return data
        } catch (error) {
            this.handleError(error)
        }
    }
}
