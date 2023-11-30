import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { eventPlace, eventTheme, eventType } from 'db/schema';

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsEnum(eventType.enumValues)
  @ApiProperty()
  eventType: string;

  @IsEnum(eventTheme.enumValues)
  @ApiProperty()
  eventTheme: string;

  @IsEnum(eventPlace.enumValues)
  @ApiProperty()
  eventPlace: string;

  @IsDateString()
  @ApiProperty()
  startsAt: string;

  @IsDateString()
  @ApiProperty()
  endsAt: string;

  @IsString()
  @ApiProperty()
  requirements: string;

  @IsString()
  @ApiProperty()
  footageLink: string;

  @IsNumber()
  @ApiProperty()
  maxParticipants: number;

  @IsNumber()
  @ApiProperty()
  codeId: number;
}
