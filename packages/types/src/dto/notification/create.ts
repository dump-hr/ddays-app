import { IsBoolean, IsString } from 'class-validator';

export const getCreateNotificationDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class CreateNotificationDto {
    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    content: string;
  }

  return CreateNotificationDto;
};
