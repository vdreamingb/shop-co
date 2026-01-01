import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpediationsDto } from './dto/createExped.dto';

@Injectable()
export class ExpediationsService {
    constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService){}

    async create(req: Request, data: CreateExpediationsDto){

    }
}
