import { ApiTags } from '@nestjs/swagger';
import { SurveyQuestionsService } from './surveyQuestions.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { SurveyQuestionType } from '@ddays-app/types';
import {
  CreateSurveyQuestionDto,
  UpdateSurveyQuestionDto,
  _UpdateSurveyQuestionDto,
} from './surveyQuestions.dto';

@ApiTags('surveyQuestions')
@Controller('survey-questions')
export class SurveyQuestionsController {
  constructor(
    private readonly surveyQuestionsService: SurveyQuestionsService,
  ) {}

  @Get()
  async getAll() {
    const surveyQuestions = await this.surveyQuestionsService.getAll();

    return surveyQuestions;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const surveyQuestion = await this.surveyQuestionsService.getOne(id);

    return surveyQuestion;
  }

  @Get('/type/:type')
  async getAllOfType(
    @Param('type', new ParseEnumPipe(SurveyQuestionType))
    type: SurveyQuestionType,
  ) {
    const surveyQuestions =
      await this.surveyQuestionsService.getAllOfType(type);

    return surveyQuestions;
  }

  @Post()
  async create(@Body() createSurveyQuestionDto: CreateSurveyQuestionDto) {
    const surveyQuestion = await this.surveyQuestionsService.create(
      createSurveyQuestionDto,
    );

    return surveyQuestion;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurveyQuestionDto: UpdateSurveyQuestionDto,
  ) {
    const surveyQuestion = await this.surveyQuestionsService.update(
      id,
      updateSurveyQuestionDto,
    );

    return surveyQuestion;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const surveyQuestion = await this.surveyQuestionsService.remove(id);

    return surveyQuestion;
  }
}
