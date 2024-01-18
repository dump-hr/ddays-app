import {
  SurveyQuestionInputType,
  SurveyQuestionType,
} from '@src/model/surveyQuestion';
import { IsEnum, IsString } from 'class-validator';

export const getCreateSurveyQuestionDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class CreateSurveyQuestionDto {
    @IsString()
    question: string;

    @IsString()
    description: string;

    @IsString()
    inputLabel: string;

    @IsEnum(SurveyQuestionInputType)
    surveyQuestionInputType: SurveyQuestionInputType;

    @IsEnum(SurveyQuestionType)
    surveyQuestionType: SurveyQuestionType;
  }

  return CreateSurveyQuestionDto;
};
