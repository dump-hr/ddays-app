import { EventPlace, EventTheme, EventType } from '../../model/event';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

export const getCreateEventDto = (ApiPropertySwagger?: any) => {
  // We did this to avoid having to include all nest dependencies related to ApiProperty on the client side too
  // With this approach the value of this decorator will be injected by the server but wont affect the client
  const ApiProperty = ApiPropertySwagger || function () {};

  class CreateEventDto {
    @IsString()
    // @ApiProperty()
    name: string;

    @IsString()
    // @ApiProperty()
    description: string;

    @IsEnum(EventType)
    // @ApiProperty({ enum: EventType })
    eventType: EventType;

    @IsEnum(EventTheme)
    // @ApiProperty({ enum: EventTheme })
    eventTheme: EventTheme;

    @IsEnum(EventPlace)
    // @ApiProperty({ enum: EventPlace })
    eventPlace: EventPlace;

    @IsDateString()
    // @ApiProperty()
    startsAt: string;

    @IsDateString()
    // @ApiProperty()
    endsAt: string;

    @IsString()
    // @ApiProperty()
    requirements: string;

    @IsString()
    // @ApiProperty()
    footageLink: string;

    @IsNumber()
    // @ApiProperty()
    maxParticipants: number;

    @IsNumber()
    // @ApiProperty()
    codeId: number;
  }

  return CreateEventDto;
};
