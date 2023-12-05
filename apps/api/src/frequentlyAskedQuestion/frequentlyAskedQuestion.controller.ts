import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FrequentlyAskedQuestionService } from './frequentlyAskedQuestion.service';
import { CreateFrequentlyAskedQuestionDto } from './dto/create-frequentlyAskedQuestion.dto';
import { UpdateFrequentlyAskedQuestionDto } from './dto/update-frequentlyAskedQuestion.dto';

@ApiTags('faq')
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

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFrequentlyAskedQuestionDto: UpdateFrequentlyAskedQuestionDto,
  ) {
    const updatedFrequentlyAskedQuestion =
      await this.frequentlyAskedQuestionService.update(
        id,
        updateFrequentlyAskedQuestionDto,
      );

    return updatedFrequentlyAskedQuestion;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedFrequentlyAskedQuestion =
      await this.frequentlyAskedQuestionService.remove(id);

    return deletedFrequentlyAskedQuestion;
  }
}
