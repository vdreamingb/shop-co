import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class ChangeExpiryDto{
    @Type(() => Date)
    @IsDate()
    expiryDate: Date;
}

export class ChangeSaleDateDto{
    @Type(() => Date)
    @IsDate()
    saleDate: Date;
}