import { IsEmail, IsString, MinLength, IsPhoneNumber, } from "class-validator";

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
}