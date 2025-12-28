import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Delete, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/createReview.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('create')
  async createReview(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    return this.reviewsService.createReview(createReviewDto, req);
  }

  @Get('all')
  async getAllReviews(){
    return this.reviewsService.getAll();
  }

  @Get('product/:productId')
  async getReviewsByProductId(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.getReviewsByProductId(productId);
  }

  @Get('product/:productId/average-rating')
  async getAverageRatingByProductId(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.getAverageRatingByProductId(productId);
  }

  @Patch('modifyRating/:id')
  async modifyRating(@Param('id', ParseIntPipe) id: number, @Body() body: {rating: number}) {
    return this.reviewsService.modifyRating(id, body.rating);
  }

  @Patch('modifyComment/:id')
  async modifyComment(@Param('id', ParseIntPipe) id: number, @Body() body: {comment: string}) {
    return this.reviewsService.mogifyComment(id, body.comment);
  }

  @Delete('delete/:id')
  async deleteReview(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.deleteReview(id);
  }
}
