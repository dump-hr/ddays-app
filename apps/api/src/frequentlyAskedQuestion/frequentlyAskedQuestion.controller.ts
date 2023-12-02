import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FrequentlyAskedQuestionService } from './frequentlyAskedQuestion.service';
import { CreateFrequentlyAskedQuestionDto } from './dto/create-frequentlyAskedQuestion.dto';
import { UpdateFrequentlyAskedQuestionDto } from './dto/update-frequentlyAskedQuestion.dto';

@Controller('faq')
export class FrequentlyAskedQuestionController {
  constructor(
    private readonly frequentlyAskedQuestionService: FrequentlyAskedQuestionService,
  ) {}

  @Get()
  async getAll() {
    const frequentlyAskedQuestions =
      await this.frequentlyAskedQuestionService.getAll();

    return frequentlyAskedQuestions;
  }

  @Post()
  async create(
    @Body() createFrequentlyAskedQuestionDto: CreateFrequentlyAskedQuestionDto,
  ) {
    const createdFrequentlyAskedQuestion =
      await this.frequentlyAskedQuestionService.create(
        createFrequentlyAskedQuestionDto,
      );

    return createdFrequentlyAskedQuestion;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFrequentlyAskedQuestionDto: UpdateFrequentlyAskedQuestionDto,
  ) {
    const updatedFrequentlyAskedQuestion =
      await this.frequentlyAskedQuestionService.update(
        +id,
        updateFrequentlyAskedQuestionDto,
      );

    return updatedFrequentlyAskedQuestion;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedFrequentlyAskedQuestion =
      await this.frequentlyAskedQuestionService.remove(+id);

    return deletedFrequentlyAskedQuestion;
  }
}
