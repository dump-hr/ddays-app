import { CompanyPasswordLoginDto, JwtResponseDto } from '@ddays-app/types';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

import { RegistrationDto } from './auth.dto';
import { UserLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UserGuard } from './user.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
  async userRegister(
    @Body() body: RegistrationDto & { isFromGoogleAuth: boolean },
  ): Promise<JwtResponseDto> {
    const { isFromGoogleAuth, ...register } = body;
    return await this.authService.userRegister(register, isFromGoogleAuth);
  }

  @Get('user/authenticated')
  @UseGuards(UserGuard)
  async findLoggedInUser(@Req() { user }) {
    return await this.authService.getUserById(user.id);
  }

  @Post('google')
  async googleLogin(@Body('token') token: string) {
    return this.authService.verifyGoogleToken(token);
  }

  @Get('callback')
  async googleCallback(
    @Query('id_token') idToken: string,
    @Res() res: Response,
  ) {
    const { redirectUrl } =
      await this.authService.handleGoogleCallback(idToken);
    return res.redirect(redirectUrl);
  }
}
