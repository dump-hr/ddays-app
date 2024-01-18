import {
  getCreateSurveyQuestionDto,
  getUpdateSurveyQuestionDto,
} from '@ddays-app/types';

export const _CreateSurveyQuestionDto = getCreateSurveyQuestionDto();
export class CreateSurveyQuestionDto extends _CreateSurveyQuestionDto {}

export const _UpdateSurveyQuestionDto = getUpdateSurveyQuestionDto();
export class UpdateSurveyQuestionDto extends _UpdateSurveyQuestionDto {}

export type SurveyQuestion = {
  id: number;
  question: string;
  description: string;
  inputLabel: string;
  surveyQuestionInputType: string;
  surveyQuestionType: string;
};
