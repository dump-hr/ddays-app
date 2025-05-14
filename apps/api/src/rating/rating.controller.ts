import {
  RatingDto,
  RatingModifyDto,
  RatingQuestionDto,
} from '@ddays-app/types';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { UserGuard } from 'src/auth/user.guard';

import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('questions')
  async getActive(): Promise<RatingQuestionDto[]> {
    return await this.ratingService.getQuestions();
  }

  @UseGuards(UserGuard)
  @Post()
  async addRatings(
    @Req() { user }: AuthenticatedRequest,
    @Body() dtos: RatingModifyDto[],
  ): Promise<RatingDto[]> {
    return await this.ratingService.addRatings(dtos, user.id);
  }
}
