import { IsString } from 'class-validator';

export class CreateFrequentlyAskedQuestionDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}
