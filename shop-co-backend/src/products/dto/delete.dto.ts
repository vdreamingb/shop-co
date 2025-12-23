import { IsNumber } from "class-validator";

export class DeleteProductDTO{
    @IsNumber()
    id: number
}