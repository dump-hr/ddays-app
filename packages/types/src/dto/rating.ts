import { RatingQuestionType } from 'src/enum';

export type RatingQuestionDto = {
  id: number;
  question: string;
  subtitle: string;
  type: `${RatingQuestionType}`;
};
