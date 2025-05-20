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
import { CompanyDto, CompanyWithFlyTalkDto } from './company';
import { UserDto, UserWithFlyTalkDto } from './user';

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
  speakers?: SpeakerWithCompanyDto[];
};

export type EventWithCompanyDto = {
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
  companies?: CompanyWithFlyTalkDto[];
  users?: UserWithFlyTalkDto[];
};

export type UserToEventDto = {
  userId: number;
  eventId: number;
  linkedinProfile?: string;
  githubProfile?: string;
  portfolioProfile?: string;
  cv?: string;
  description?: string;
  event?: EventDto;
  user?: UserDto;
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

export type EventWithUsersDto = {
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
  users?: UserDto[];
};
