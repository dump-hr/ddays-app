import { IsBoolean, IsString } from 'class-validator';

export const getUpdateNotificationDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class UpdateNotificationDto {
    @IsString()
    title: string;

    @IsString()
    content: string;
  }

  return UpdateNotificationDto;
};
