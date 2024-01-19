import { IsString } from 'class-validator';

export type FrequentlyAskedQuestionDto = {
  id: number;
  question: string;
  answer: string;
};

export class FrequentlyAskedQuestionModifyDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}
