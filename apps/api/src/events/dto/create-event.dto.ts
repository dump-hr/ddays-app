import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { eventPlace, eventTheme, eventType } from 'db/schema';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(eventType.enumValues)
  eventType: string;

  @IsEnum(eventTheme.enumValues)
  eventTheme: string;

  @IsEnum(eventPlace.enumValues)
  eventPlace: string;

  @IsDateString()
  startsAt: string;

  @IsDateString()
  endsAt: string;

  @IsString()
  requirements: string;

  @IsString()
  footageLink: string;

  @IsString()
  maxParticipants: number;

  @IsNumber()
  codeId: number;
}
