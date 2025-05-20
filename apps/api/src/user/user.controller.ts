import { InterestDto } from '@ddays-app/types';
import {
  ChangeUserPasswordDto,
  ResetUserPasswordDto,
} from '@ddays-app/types/src/dto/user';
import {
  Body,
  Controller,
  Get,
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
  softDeleteUser(@Req() { user }) {
    return this.userService.softDeleteUser(user.id);
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
}
