import { CompanyPasswordLoginDto, JwtResponseDto } from '@ddays-app/types';
import { UserDto, UserModifyDto } from '@ddays-app/types/src/dto/user';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UserLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UserGuard } from './user.guard';

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
    return await this.authService.userPasswordLogin(email, password);
  }

  @Post('user/register')
  async userRegister(@Body() register: UserDto): Promise<JwtResponseDto> {
    return await this.authService.userRegister(register);
  }

  @Get('user/authenticated')
  @UseGuards(UserGuard)
  async findLoggedInUser(@Req() { user }) {
    return await this.authService.getUserById(user.id);
  }
}
