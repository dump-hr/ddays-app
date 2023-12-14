import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SponsorAuthGuard } from './sponsor/jwt-auth-guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginDto) {
    const accessToken = await this.authService.companyPasswordLogin(
      login.email,
      login.password,
    );

    return {
      access_token: accessToken,
    };
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Get('me/sponsor')
  async whichCompanyAmI(@Req() { company }) {
    return company;
  }
}
