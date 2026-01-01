import { IsEmail, IsString, MinLength, IsPhoneNumber, IsEnum } from "class-validator";
import { RoleEnum } from "src/common/enums/roles.enum";

export class RegisterDto{
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    password:string

    @IsString()
    @MinLength(2)
    firstName:string

    @IsString()
    @MinLength(2)
    lastName: string;

    @IsString()
    @IsPhoneNumber()
    phoneNumber:string;

    @IsString()
    @IsEnum(RoleEnum)
    role?: string;
}