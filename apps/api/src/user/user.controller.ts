import { InterestDto, UserCreateForAccreditationDto } from '@ddays-app/types';
import {
  ChangeUserPasswordDto,
  ResetUserPasswordDto,
  UserPublicDto,
} from '@ddays-app/types/src/dto/user';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { UserGuard } from 'src/auth/user.guard';

import { UserModifyDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('profile')
  @UseGuards(UserGuard)
  updateUserProfile(@Req() { user }, @Body() userModifyDto: UserModifyDto) {
    return this.userService.updateUserProfile(user.id, userModifyDto);
  }

  @Patch('profile/delete')
  @UseGuards(UserGuard)
  deleteUser(@Req() { user }) {
    return this.userService.deleteUser(user.id);
  }

  @Patch('profile/change-password')
  @UseGuards(UserGuard)
  updateUserPassword(
    @Req() { user },
    @Body()
    { currentPassword, newPassword }: ChangeUserPasswordDto,
  ) {
    return this.userService.updateUserPassword(
      user.id,
      currentPassword,
      newPassword,
    );
  }

  @Patch('interests')
  @UseGuards(UserGuard)
  updateUserInterests(@Req() { user }, @Body() interests: InterestDto[]) {
    return this.userService.updateUserInterests(user.id, interests);
  }

  @Post('reset-password')
  resetUserPassword(
    @Body() { newPassword, token }: ResetUserPasswordDto & { token: string },
  ) {
    return this.userService.resetUserPassword(newPassword, token);
  }

  @UseGuards(AdminGuard)
  @Get('count')
  async getUserCount(): Promise<number> {
    return await this.userService.getUserCount();
  }

  @UseGuards(AdminGuard)
  @Get('all')
  async getAllUsers(): Promise<Partial<UserPublicDto>[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getOneUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Partial<UserPublicDto>> {
    return await this.userService.getOneUser(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  async createUserForAccreditation(
    @Body() dto: UserCreateForAccreditationDto,
  ): Promise<Partial<UserPublicDto>> {
    return await this.userService.createUserForAccreditation(dto);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateUserForAccreditation(
    @Param('id', ParseIntPipe) id: number,
    @Body() userModifyDto: UserCreateForAccreditationDto,
  ): Promise<Partial<UserPublicDto>> {
    return await this.userService.updateUserForAccreditation(id, userModifyDto);
  }
}
