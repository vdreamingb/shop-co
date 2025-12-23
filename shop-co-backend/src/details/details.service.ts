import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createDetailsDto } from './dto/createDetails.dto';

@Injectable()
export class DetailsService {
    constructor(private readonly prismaService: PrismaService){}

    async createDetails(data: createDetailsDto){
        return await this.prismaService.productDetails.create({
            data: {
                productId: data.productId,
                color: data.color,
                size: data.size,
                gender: data.gender,
                style: data.style,
                type: data.type
            }
        })
    }

    async modifyProductColor(color: string, id: number){
        return await this.prismaService.productDetails.update({
            where: {
                id
            },
            data:{
                color
            }
        })
    }

    async modifyProductInfo(){
        
    }
}
