import { IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class ModifyUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    lastName?: string

    @IsOptional()
    @IsPhoneNumber()
    phoneNumber?: string;
}