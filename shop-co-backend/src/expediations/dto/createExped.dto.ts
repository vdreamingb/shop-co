import { IsString, IsNumber, IsOptional, IsPhoneNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExpediationItemDto } from './createExpediationItem.dto';

export class CreateExpediationsDto{
    @IsString()
    address: string;

    @IsPhoneNumber()
    @IsString()
    phoneNumber: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateExpediationItemDto)
    items: CreateExpediationItemDto[]
}