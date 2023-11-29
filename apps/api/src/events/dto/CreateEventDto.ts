import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(['lecture', 'workshop', 'flyTalk', 'campfireTalk', 'other'])
  eventType: string;

  @IsEnum(['dev', 'design', 'tech', 'marketing'])
  eventTheme: string;

  @IsEnum(['online', 'inPerson'])
  eventPlace: string;

  @IsDate()
  startsAt: Date;

  @IsDate()
  endsAt: Date;

  @IsString()
  requirements: string;

  @IsString()
  footageLink: string;

  @IsString()
  maxParticipants: number;

  @IsNumber()
  codeId: number;
}
