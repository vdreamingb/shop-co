import { IsInt, IsNumber } from "class-validator";

export class CreateExpediationItemDto{
    @IsNumber()
    productId: number

    @IsNumber()
    @IsInt()
    quantity: number

    @IsNumber()
    unitPrice: number
}