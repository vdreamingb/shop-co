import {
  Controller,
  Delete,
  ParseIntPipe,
  Put,
  Body,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Get, Param } from "@nestjs/common";
import { ModifyUserDto } from "./dto/modifyUser";
import { JwtGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { RoleEnum } from "src/common/enums/roles.enum";
import { Roles } from "src/common/decorators/roles.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get("email")
  async getUserByEmail(@Body() body: { email: string }) {
    return this.usersService.findByEmail(body.email);
  }

  @Get(":id")
  async getUserById(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get("")
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Delete("delete/:id")
  async deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Put("update/:id")
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: ModifyUserDto,
  ) {
    return this.usersService.updateUser(id, body);
  }
}
