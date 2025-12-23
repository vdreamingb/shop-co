import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

enum SizeEnum {
    XXS = "XX-Small",
    XS = "X-Smal",
    L = "Large",
    M = "Medium",
    XL = "X-Large",
    XXL = "XX-Large",
    XXXL = "3X-Large",
    XXXXL = "4X-Large"
}

enum StyleEnum {
    casual = "Casual",
    formal = "Formal",
    party = "Party",
    gym = "Gym" 
}

enum TypeEnum{
    tshirt = "Tshirts",
    shorts = "Shorts",
    hoodie = "Hoodie",
    jeans = "Jeans"
}

enum GenderEnum{
    m = "Masculine",
    f = "Feminine",
    u = "Unisex"
}

export class createDetailsDto{
    @Type(() => Number)
    @IsNumber()
    productId: number

    @IsString()
    @MinLength(3)
    color: string

    @IsEnum(SizeEnum)
    size: string

    @IsOptional()
    @IsEnum(GenderEnum)
    gender: string

    @IsOptional()
    @IsEnum(StyleEnum)
    style?: string

    @IsOptional()
    @IsEnum(TypeEnum)
    type:string
}