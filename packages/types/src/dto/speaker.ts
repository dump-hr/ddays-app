import { IsNumber, IsString } from 'class-validator';

export type SpeakerDto = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  companyId?: number;
  photo: string;
};

export class SpeakerModifyDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  title: string;

  @IsNumber()
  companyId: number;
}
