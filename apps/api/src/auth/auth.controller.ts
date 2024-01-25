import { CompanyPasswordLoginDto, JwtResponseDto } from '@ddays-app/types';
import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('company/login')
  async companyPasswordLogin(
    @Body() login: CompanyPasswordLoginDto,
  ): Promise<JwtResponseDto> {
    return await this.authService.companyPasswordLogin(
      login.username,
      login.password,
    );
  }
}
