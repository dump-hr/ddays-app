import {
  IsBoolean,
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

export type EventWithRatingDto = {
  id: number;
  name: string;
  type: `${EventType}`;
  theme: `${Theme}`;
  numberOfRatings?: number;
  numberOfApplications?: number;
  averageRating?: number;
};

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
  isApplicationOpen?: boolean;
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
  isApplicationOpen?: boolean;
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
  isApplicationOpen?: boolean;
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
  isApplicationOpen?: boolean;
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

  @IsOptional()
  @IsBoolean()
  isApplicationOpen?: boolean;
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
  isApplicationOpen?: boolean;
};
