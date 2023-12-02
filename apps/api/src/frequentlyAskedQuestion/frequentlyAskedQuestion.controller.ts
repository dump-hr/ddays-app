import { Controller } from '@nestjs/common';
import { FrequentlyAskedQuestionService } from './frequentlyAskedQuestion.service';

@Controller('faq')
export class FrequentlyAskedQuestionController {
  constructor(private readonly frequentlyAskedQuestionService: FrequentlyAskedQuestionService) {}
}