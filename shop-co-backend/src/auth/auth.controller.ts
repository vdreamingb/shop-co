import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.firstName, dto.lastName, dto.phoneNumber)
  }

  @Post('login')
  async login(@Body() dto: LoginDto){
    return this.authService.login(dto.email, dto.password)
  }
  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string){
    await this.authService.logout(refreshToken)
    return {
      loggedOut: true
    }
  }

  @UseGuards(JwtGuard)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string){
    return await this.authService.refresh(refreshToken)
  }
}
