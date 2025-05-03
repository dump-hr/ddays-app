import { InterestDto } from '@ddays-app/types';
import {
  ChangeUserPasswordDto,
  UserModifyDto,
} from '@ddays-app/types/src/dto/user';
import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { UserGuard } from 'src/auth/user.guard';

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
  updateUserInterests(
    @Req() { user }: AuthenticatedRequest,
    @Body() interests: InterestDto[],
  ) {
    return this.userService.updateUserInterests(user.id, interests);
  }
}
