import { RatingQuestionDto } from '@ddays-app/types';
import { Controller, Get } from '@nestjs/common';

import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('questions')
  async getActive(): Promise<RatingQuestionDto[]> {
    return await this.ratingService.getQuestions();
  }
}
