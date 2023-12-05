import { CreateFrequentlyAskedQuestionDto } from './create-frequentlyAskedQuestion.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFrequentlyAskedQuestionDto extends PartialType(
  CreateFrequentlyAskedQuestionDto,
) {}
