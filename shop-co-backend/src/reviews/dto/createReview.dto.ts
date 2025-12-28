import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsString, MinLength } from "class-validator";

enum RatingEnum{
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5
}

export class CreateReviewDto{
    @Type(() => Number)
    @IsNumber()
    productId: number;

    @Type(() => Number)
    @IsEnum(RatingEnum)
    @IsNumber()
    rating: number;

    @IsString()
    @MinLength(2)
    comment: string
}