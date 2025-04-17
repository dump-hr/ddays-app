import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangeUserPasswordDto,
  UserModifyDto,
} from '@ddays-app/types/src/dto/user';
import { UserGuard } from 'src/auth/user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('profile')
  @UseGuards(UserGuard)
  updateUserProfile(@Req() { user }, @Body() userModifyDto: UserModifyDto) {
    return this.userService.updateUserProfile(user.id, userModifyDto);
  }

  @Delete('profile')
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
}
