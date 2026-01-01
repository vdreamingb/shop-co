import { IsString, IsNumber, IsOptional, IsPhoneNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpediationsDto{
    @IsString()
    address: string;

    @IsPhoneNumber()
    @IsString()
    phoneNumber: string;

}