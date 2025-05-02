import { AvatarUpdateDto, AvatarUploadDto } from '@ddays-app/types';
import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserGuard } from 'src/auth/user.guard';

import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post('upload')
  @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Body() avatarUploadDto: AvatarUploadDto,
    @Req() { user },
  ) {
    const userId = user.id;

    const avatarUpdateDto: AvatarUpdateDto = {
      color: avatarUploadDto.colors || null,
      face: avatarUploadDto.face || null,
      accessory: avatarUploadDto.accessories || null,
      body: avatarUploadDto.body || null,
    };

    return this.avatarService.updateAvatar(
      userId,
      file.buffer,
      file.mimetype,
      avatarUpdateDto,
    );
  }
}
