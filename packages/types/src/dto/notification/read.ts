import { IsDate, IsNumber, IsString } from 'class-validator';

export const getNotificationDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class NotificationDto {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    content: string;

    @IsDate()
    @ApiProperty()
    activatedAt: Date;
  }

  return NotificationDto;
};
