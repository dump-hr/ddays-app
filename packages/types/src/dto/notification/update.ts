import { IsBoolean, IsString } from 'class-validator';

export const getUpdateNotificationDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class UpdateNotificationDto {
    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    content: string;

    @IsBoolean()
    @ApiProperty()
    isActive: boolean;
  }

  return UpdateNotificationDto;
};
