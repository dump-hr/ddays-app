import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FrequentlyAskedQuestionService } from './frequentlyAskedQuestion.service';

@Controller('faq')
export class FrequentlyAskedQuestionController {
  constructor(private readonly frequentlyAskedQuestionService: FrequentlyAskedQuestionService) {}

  @Get()
  async getAll() {
    const frequentlyAskedQuestions = await this.frequentlyAskedQuestionService.getAll();

    return frequentlyAskedQuestions;
  }

  @Post()
  async create() {
    const createdFrequentlyAskedQuestion = await this.frequentlyAskedQuestionService.create();

    return createdFrequentlyAskedQuestion;
  }

  @Put(':id')
  async update() {
    const updatedFrequentlyAskedQuestion = await this.frequentlyAskedQuestionService.update();

    return updatedFrequentlyAskedQuestion;
  }

  @Delete(':id')
  async remove() {
    const deletedFrequentlyAskedQuestion = await this.frequentlyAskedQuestionService.remove();

    return deletedFrequentlyAskedQuestion;
  }
}