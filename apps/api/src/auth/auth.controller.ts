import { CompanyPasswordLoginDto, JwtResponseDto } from '@ddays-app/types';

import { UserDto } from '@ddays-app/types/src/dto/user';
import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserLoginDto } from './auth.dto';

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

  @Post('user/register')
  async userRegister(@Body() register: UserDto): Promise<JwtResponseDto> {
    return await this.authService.userRegister(register);
  }

  @Post('user/login')
  async userPasswordLogin(
    @Body() login: UserLoginDto,
  ): Promise<JwtResponseDto> {
    console.log('login', login);
    return await this.authService.userPasswordLogin(
      login.email,
      login.password,
    );
  }
}
