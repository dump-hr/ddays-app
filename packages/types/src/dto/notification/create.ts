import { IsBoolean, IsString } from 'class-validator';

export const getCreateNotificationDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class CreateNotificationDto {
    @IsString()
    title: string;

    @IsString()
    content: string;
  }

  return CreateNotificationDto;
};
