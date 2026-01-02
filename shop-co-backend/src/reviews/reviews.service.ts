import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
    private readonly logger = new Logger(ReviewsService.name, { timestamp: true})

    constructor(private readonly prismaService: PrismaService){}

    private handleError(error: unknown): never {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                this.logger.error('Sale not found');
                throw new NotFoundException('Review not found');
            }
        }
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(message, error instanceof Error ? error.stack : undefined);
        throw new InternalServerErrorException('Something went wrong');
    }

    async createReview(data: CreateReviewDto, id: number){
        this.logger.log("Creating review");
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
        this.logger.log("Fetching all reviews");
        return this.prismaService.review.findMany();
    }

    async getReviewsByProductId(productId: number){
        this.logger.log("Fetching reviews for product ID");
        return this.prismaService.review.findMany({
            where: {
                productId
            }
        });
    }

    async getAverageRatingByProductId(productId: number){
        this.logger.log("Calculating average rating for product ID");
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
        try {
            this.logger.log("Deleting review");
            return this.prismaService.review.delete({
            where: {
                    id
            }
            });
        } catch (error) {
            this.handleError(error);
        }
    }

    async modifyRating(id: number, rating: number){
        this.logger.log("Modifying review rating");
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
        this.logger.log("Modifying review comment");
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
