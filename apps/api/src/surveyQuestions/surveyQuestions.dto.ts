import {
  getCreateSurveyQuestionDto,
  getUpdateSurveyQuestionDto,
} from '@ddays-app/types';
import { ApiProperty } from '@nestjs/swagger';

export const _CreateSurveyQuestionDto = getCreateSurveyQuestionDto(ApiProperty);
export class CreateSurveyQuestionDto extends _CreateSurveyQuestionDto {}

export const _UpdateSurveyQuestionDto = getUpdateSurveyQuestionDto(ApiProperty);
export class UpdateSurveyQuestionDto extends _UpdateSurveyQuestionDto {}
