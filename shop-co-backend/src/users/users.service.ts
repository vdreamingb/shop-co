import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService:PrismaService){}

    private readonly logger = new Logger(UsersService.name, { timestamp: true });

    private handleError(error: unknown): never {
    const message = error instanceof Error ? error.message : String(error);
    this.logger.error(
      message,
      error instanceof Error ? error.stack : undefined,
    );
    throw new InternalServerErrorException("Something went wrong");
  }

    async findByEmail(email:string){
        this.logger.log("Finding user by email");
        try {
            return this.prismaService.user.findUnique({where:{email}})
        } catch (error) {
            this.handleError(error);
        }
    }

    async findById(id:number){
        this.logger.log("Finding user by ID");
        try {
            return this.prismaService.user.findUnique({where:{id}})
        } catch (error) {
            this.handleError(error);
        }
    }

    async findAll(){
        this.logger.log("Finding all users");
        try {
            return this.prismaService.user.findMany();
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteUser(id:number){
        this.logger.log("Deleting user");
        try {
            return this.prismaService.user.delete({where:{id}})
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateUser(id:number, data:Partial<{email:string, firstName:string, lastName:string, phoneNumber:string}>){
        this.logger.log("Updating user");
        try {
            return this.prismaService.user.update({where:{id}, data})
        } catch (error) {
            this.handleError(error);
        }
    }
}
