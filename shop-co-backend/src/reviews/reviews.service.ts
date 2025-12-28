import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ReviewsService {
    constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService){}

    async createReview(data: CreateReviewDto, req: Request){
        const id = await this.authService.getUserId(req)
        return this.prismaService.review.create({
            data:{
                userId: id,
                productId: data.productId,
                rating: data.rating,
                comment: data.comment
            }
        });
    }

    async getAll(){
        return this.prismaService.review.findMany();
    }

    async getReviewsByProductId(productId: number){
        return this.prismaService.review.findMany({
            where: {
                productId
            }
        });
    }

    async getAverageRatingByProductId(productId: number){
        const result = await this.prismaService.review.aggregate({
            where: {
                productId
            },
            _avg: {
                rating: true
            }
        });
        return result._avg.rating;
    }

    async deleteReview(id: number){
        return this.prismaService.review.delete({
            where: {
                id
            }
        });
    }

    async modifyRating(id: number, rating: number){
        return this.prismaService.review.update({
            where: {
                id
            },
            data: {
                rating
            }
        });
    }

    async mogifyComment(id: number, comment: string){
        return this.prismaService.review.update({
            where: {
                id
            },
            data: {
                comment
            }
        });
    }
}
