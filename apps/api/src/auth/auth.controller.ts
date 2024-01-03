import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthenticatedRequest } from './auth.dto';
import { SponsorLoginDto } from './sponsor.dto';
import { SponsorAuthGuard } from './sponsor.guard';
import { AuthService } from './sponsor.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/sponsor')
  async login(@Body() login: SponsorLoginDto) {
    const accessToken = await this.authService.CompanyPasswordLogin(
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
  async whichCompanyAmI(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
