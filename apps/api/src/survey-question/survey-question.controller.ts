import {
  SurveyQuestionDto,
  SurveyQuestionModifyDto,
  SurveyQuestionType,
} from '@ddays-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';

import { SurveyQuestionService } from './survey-question.service';

@Controller('survey-question')
export class SurveyQuestionController {
  constructor(private readonly surveyQuestionService: SurveyQuestionService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @Body() dto: SurveyQuestionModifyDto,
  ): Promise<SurveyQuestionDto> {
    return await this.surveyQuestionService.create(dto);
  }

  @Get()
  async getAll(): Promise<SurveyQuestionDto[]> {
    return await this.surveyQuestionService.getAll();
  }

  @Get('/type/:type')
  async getAllOfType(
    @Param('type', new ParseEnumPipe(SurveyQuestionType))
    type: SurveyQuestionType,
  ): Promise<SurveyQuestionDto[]> {
    return await this.surveyQuestionService.getAllOfType(type);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SurveyQuestionDto> {
    return await this.surveyQuestionService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SurveyQuestionModifyDto,
  ): Promise<SurveyQuestionDto> {
    return await this.surveyQuestionService.update(id, dto);
  }
}
