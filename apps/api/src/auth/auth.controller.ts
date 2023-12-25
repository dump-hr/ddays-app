import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SponsorLoginDto } from './login.dto';
import { SponsorAuthGuard } from './sponsor/jwt-auth-guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/sponsor')
  async login(@Body() login: SponsorLoginDto) {
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
  async whichCompanyAmI(@Req() req: any) {
    return req.user;
  }
}
