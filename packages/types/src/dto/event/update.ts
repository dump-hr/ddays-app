import { EventPlace, EventTheme, EventType } from '../../model/event';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export const getUpdateEventDto = (ApiPropertySwagger?: any) => {
  // We did this to avoid having to include all nest dependencies related to ApiProperty on the client side too
  // With this approach the value of this decorator will be injected by the server but wont affect the client
  const ApiProperty = ApiPropertySwagger || function () {};

  class UpdateEventDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsEnum(EventType)
    @ApiProperty({ enum: EventType })
    eventType: EventType;

    @IsOptional()
    @IsEnum(EventTheme)
    @ApiProperty({ enum: EventTheme })
    eventTheme: EventTheme;

    @IsOptional()
    @IsEnum(EventPlace)
    @ApiProperty({ enum: EventPlace })
    eventPlace: EventPlace;

    @IsDateString()
    @ApiProperty()
    startsAt: string;

    @IsOptional()
    @IsDateString()
    @ApiProperty()
    endsAt: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    requirements: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    footageLink: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    maxParticipants: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    codeId: number;
  }

  return UpdateEventDto;
};
