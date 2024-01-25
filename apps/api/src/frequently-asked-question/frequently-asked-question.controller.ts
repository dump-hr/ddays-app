import {
  FrequentlyAskedQuestionDto,
  FrequentlyAskedQuestionModifyDto,
} from '@ddays-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { FrequentlyAskedQuestionService } from './frequently-asked-question.service';

@Controller('faq')
export class FrequentlyAskedQuestionController {
  constructor(
    private readonly frequentlyAskedQuestionService: FrequentlyAskedQuestionService,
  ) {}

  @Post()
  async create(
    @Body() dto: FrequentlyAskedQuestionModifyDto,
  ): Promise<FrequentlyAskedQuestionDto> {
    return await this.frequentlyAskedQuestionService.create(dto);
  }

  @Get()
  async getAll(): Promise<FrequentlyAskedQuestionDto[]> {
    return await this.frequentlyAskedQuestionService.getAll();
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FrequentlyAskedQuestionDto> {
    return await this.frequentlyAskedQuestionService.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FrequentlyAskedQuestionModifyDto,
  ): Promise<FrequentlyAskedQuestionDto> {
    return await this.frequentlyAskedQuestionService.update(id, dto);
  }
}
