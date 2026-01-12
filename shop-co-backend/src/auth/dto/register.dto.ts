import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsPhoneNumber, IsEnum } from "class-validator";
import { RoleEnum } from "src/common/enums/roles.enum";
import { LoginDto } from "./login.dto";

export class RegisterDto extends LoginDto{
    @ApiProperty()
    @IsString()
    @MinLength(2)
    firstName:string

    @ApiProperty()
    @IsString()
    @MinLength(2)
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsPhoneNumber()
    phoneNumber:string;

    @ApiProperty({ enum: RoleEnum, required: false })
    @IsString()
    @IsEnum(RoleEnum)
    role?: string;
}