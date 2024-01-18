import { IsString } from 'class-validator';

export class UpdateFrequentlyAskedQuestionDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}
