import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { RatingQuestionType } from '../enum';

export type RatingQuestionDto = {
  id: number;
  question: string;
  subtitle: string;
  type: `${RatingQuestionType}`;
  excludefromAvg?: boolean;
};

export type RatingDto = {
  id: number;
  userId: number;
  boothId?: number;
  eventId?: number;
  value: number;
  ratingQuestionId: number;
  comment?: string;
};

export class RatingModifyDto {
  @IsOptional()
  @IsNumber()
  boothId?: number;

  @IsOptional()
  @IsNumber()
  eventId?: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  value: number;

  @IsNumber()
  ratingQuestionId: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
