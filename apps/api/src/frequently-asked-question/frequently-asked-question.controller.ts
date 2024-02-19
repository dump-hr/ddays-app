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
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';

import { FrequentlyAskedQuestionService } from './frequently-asked-question.service';

@Controller('faq')
export class FrequentlyAskedQuestionController {
  constructor(
    private readonly frequentlyAskedQuestionService: FrequentlyAskedQuestionService,
  ) {}

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FrequentlyAskedQuestionDto> {
    return await this.frequentlyAskedQuestionService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FrequentlyAskedQuestionModifyDto,
  ): Promise<FrequentlyAskedQuestionDto> {
    return await this.frequentlyAskedQuestionService.update(id, dto);
  }
}
