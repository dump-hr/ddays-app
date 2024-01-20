import { SurveyQuestionInputType, SurveyQuestionType } from '../enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export type SurveyQuestionDto = {
  id: number;
  question: string;
  description?: string;
  inputLabel?: string;
  inputType: `${SurveyQuestionInputType}`;
  type: `${SurveyQuestionType}`;
};

export class SurveyQuestionModifyDto {
  @IsString()
  question: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  inputLabel?: string;

  @IsEnum(SurveyQuestionInputType)
  inputType: SurveyQuestionInputType;

  @IsEnum(SurveyQuestionType)
  type: SurveyQuestionType;
}
