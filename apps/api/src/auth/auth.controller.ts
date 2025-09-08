import { CompanyPasswordLoginDto, JwtResponseDto } from '@ddays-app/types';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { RegistrationDto } from './auth.dto';
import { UserLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UserGuard } from './user.guard';
import { AdminGuard } from './admin.guard';

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

  @Post('user/login')
  async userPasswordLogin(
    @Body() { email, password }: UserLoginDto,
  ): Promise<JwtResponseDto> {
    //maknit kada se omogući registracija
    if (process.env.NODE_ENV !== 'dev') {
      throw new ForbiddenException(
        'Aplikacija je zatvorena, vidimo se prije dump daysa!',
      );
    }
    return await this.authService.userPasswordLogin(email, password);
  }

  @Post('user/register')
  async userRegister(
    @Body() register: RegistrationDto,
  ): Promise<JwtResponseDto> {
    //maknit kada se omogući registracija
    if (process.env.NODE_ENV !== 'dev') {
      throw new ForbiddenException(
        'Aplikacija je zatvorena, vidimo se prije dump daysa!',
      );
    }
    return await this.authService.userRegister(register);
  }

  @Get('user/authenticated')
  @UseGuards(UserGuard)
  async findLoggedInUser(@Req() { user }) {
    return await this.authService.getUserById(user.id);
  }
}
