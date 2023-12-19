import { IsString } from 'class-validator';

export const getUpdateNotificationDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class UpdateNotificationDto {
    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    content: string;

    @IsString()
    @ApiProperty()
    isActive: string;
  }

  return UpdateNotificationDto;
};
