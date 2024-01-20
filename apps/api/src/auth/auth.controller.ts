import { CompanyPasswordLoginDto } from '@ddays-app/types';
import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/sponsor')
  async companyPasswordLogin(@Body() login: CompanyPasswordLoginDto) {
    const accessToken = await this.authService.companyPasswordLogin(
      login.username,
      login.password,
    );

    return { access_token: accessToken };
  }
}
