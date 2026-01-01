import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Delete, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleEnum } from 'src/common/enums/roles.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createReview(@Body() createReviewDto: CreateReviewDto, @Req() req: Request, @CurrentUser() user,) {
    return this.reviewsService.createReview(createReviewDto, user.userId);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('all')
  async getAllReviews(){
    return this.reviewsService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get('product/:productId')
  async getReviewsByProductId(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.getReviewsByProductId(productId);
  }

  @UseGuards(JwtGuard)
  @Get('product/:productId/average-rating')
  async getAverageRatingByProductId(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.getAverageRatingByProductId(productId);
  }

  @UseGuards(JwtGuard)
  @Patch('modifyRating/:id')
  async modifyRating(@Param('id', ParseIntPipe) id: number, @Body() body: {rating: number}) {
    return this.reviewsService.modifyRating(id, body.rating);
  }

  @UseGuards(JwtGuard)
  @Patch('modifyComment/:id')
  async modifyComment(@Param('id', ParseIntPipe) id: number, @Body() body: {comment: string}) {
    return this.reviewsService.mogifyComment(id, body.comment);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async deleteReview(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.deleteReview(id);
  }
}
