import { SurveyQuestionType } from '@ddays-app/types';
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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SurveyQuestionService } from './survey-question.service';
import {
  _UpdateSurveyQuestionDto,
  CreateSurveyQuestionDto,
  UpdateSurveyQuestionDto,
} from './surveyQuestions.dto';

@Controller('survey-question')
export class SurveyQuestionController {
  constructor(private readonly surveyQuestionService: SurveyQuestionService) {}

  @Post()
  async create(@Body() createSurveyQuestionDto: CreateSurveyQuestionDto) {
    const surveyQuestion = await this.surveyQuestionService.create(
      createSurveyQuestionDto,
    );

    return surveyQuestion;
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const surveyQuestion = await this.surveyQuestionService.getOne(id);

    return surveyQuestion;
  }
  @Get()
  async getAll() {
    const surveyQuestions = await this.surveyQuestionService.getAll();

    return surveyQuestions;
  }

  @Get('/type/:type')
  async getAllOfType(
    @Param('type', new ParseEnumPipe(SurveyQuestionType))
    type: SurveyQuestionType,
  ) {
    const surveyQuestions = await this.surveyQuestionService.getAllOfType(type);

    return surveyQuestions;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const surveyQuestion = await this.surveyQuestionService.remove(id);

    return surveyQuestion;
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurveyQuestionDto: UpdateSurveyQuestionDto,
  ) {
    const surveyQuestion = await this.surveyQuestionService.update(
      id,
      updateSurveyQuestionDto,
    );

    return surveyQuestion;
  }
}
