import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EventType, Theme } from '../enum';
import { SpeakerWithCompanyDto } from './speaker';

export type EventDto = {
  id: number;
  name: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  maxParticipants?: number;
  requirements?: string;
  footageLink?: string;
  type: `${EventType}`;
  theme: `${Theme}`;
  codeId?: number;
};

export type EventWithSpeakerDto = {
  id: number;
  name: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  maxParticipants?: number;
  requirements?: string;
  footageLink?: string;
  type: `${EventType}`;
  theme: `${Theme}`;
  codeId?: number;
  speaker?: SpeakerWithCompanyDto;
};

export class EventModifyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(EventType)
  type: EventType;

  @IsEnum(Theme)
  theme: Theme;

  @IsDateString()
  startsAt: string;

  @IsDateString()
  endsAt: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  footageLink?: string;

  @IsOptional()
  @IsNumber()
  maxParticipants?: number;

  @IsOptional()
  @IsNumber()
  codeId?: number;
}
