import { IsDate, IsNumber, IsString } from 'class-validator';

export const getNotificationDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class NotificationDto {
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsDate()
    activatedAt: Date;
  }

  return NotificationDto;
};
