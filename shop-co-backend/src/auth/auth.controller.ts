import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiOperation} from '@nestjs/swagger';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.firstName, dto.lastName, dto.phoneNumber, dto.role)
  }

  @ApiOperation({ summary: 'Login a user' })
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({passthrough:true}) res: Response){
    return this.authService.login(dto.email, dto.password, res)
  }

  @ApiOperation({ summary: 'Logout a user' })
  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string){
    await this.authService.logout(refreshToken)
    return {
      loggedOut: true
    }
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @Post('refresh')
  async refresh(@Req() req:Request, @Res({passthrough:true}) res: Response){
    const refreshToken = req.cookies["refreshToken"]
    console.log(refreshToken)
    return await this.authService.refresh(refreshToken, res)
  }

  @ApiOperation({ summary: 'Get information about the current user' })
  @Get('whoami')
  async whoAmI(@Req() req: Request){
    return this.authService.whoAmI(req);
  }

  @ApiOperation({ summary: "Check if user is logged" })
  @Get('logged')
  async logged(@Req() req: Request){
    return this.authService.checkLogged(req)
  }
}
