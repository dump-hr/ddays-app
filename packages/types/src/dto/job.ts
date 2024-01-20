import { IsNumber, IsOptional, IsString } from 'class-validator';

export type JobDto = {
  id: number;
  position: string;
  location?: string;
  details: string;
  link?: string;
  createdAt: Date;
  companyId: number;
};

export class JobModifyDto {
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsString()
  details: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsNumber()
  companyId: number;
}
