import { EventPlace, EventTheme, EventType } from '../../model/event';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';

export const getCreateEventDto = (ApiPropertySwagger?: any) => {
  // We did this to avoid having to include all nest dependencies related to ApiProperty on the client side too
  // With this approach the value of this decorator will be injected by the server but wont affect the client
  const ApiProperty = ApiPropertySwagger || function () {};

  class CreateEventDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(EventType)
    eventType: EventType;

    @IsOptional()
    @IsEnum(EventTheme)
    eventTheme: EventTheme;

    @IsDateString()
    startsAt: string;

    @IsOptional()
    @IsDateString()
    endsAt: string;

    @IsOptional()
    @IsString()
    requirements: string;

    @IsOptional()
    @IsString()
    footageLink: string;

    @IsOptional()
    @IsNumber()
    maxParticipants: number;

    @IsOptional()
    @IsNumber()
    codeId: number;
  }

  return CreateEventDto;
};
