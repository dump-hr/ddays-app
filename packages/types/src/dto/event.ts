import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EventType, Theme } from '../enum';

export type EventDto = {
  id: number;
  name: string;
  description?: string;
  startsAt: Date;
  endsAt: Date;
  maxParticipants?: number;
  requirements?: string;
  footageLink?: string;
  type: `${EventType}`;
  theme: `${Theme}`;
  codeId?: number;
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

  @IsDate()
  startsAt: Date;

  @IsDate()
  endsAt: Date;

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
