import {
  SurveyQuestionInputType,
  SurveyQuestionType,
} from '@src/model/surveyQuestion';
import { IsEnum, IsString } from 'class-validator';

export const getUpdateSurveyQuestionDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class UpdateSurveyQuestionDto {
    @IsString()
    @ApiProperty()
    question: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    inputLabel: string;

    @IsEnum(SurveyQuestionInputType)
    @ApiProperty({ enum: SurveyQuestionInputType })
    surveyQuestionInputType: SurveyQuestionInputType;

    @IsEnum(SurveyQuestionType)
    @ApiProperty({ enum: SurveyQuestionType })
    surveyQuestionType: SurveyQuestionType;
  }

  return UpdateSurveyQuestionDto;
};
