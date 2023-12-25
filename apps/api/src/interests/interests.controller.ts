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
import { ApiTags } from '@nestjs/swagger';

import { CreateInterestDto } from './interests.dto';
import { UpdateInterestDto } from './interests.dto';
import { InterestsService } from './interests.service';

@ApiTags('interests')
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Post()
  async create(@Body() createInterestDto: CreateInterestDto) {
    const createdInterest =
      await this.interestsService.create(createInterestDto);

    return createdInterest;
  }

  @Get()
  async getAll() {
    const interests = await this.interestsService.getAll();

    return interests;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const interest = await this.interestsService.getOne(id);

    return interest;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInterestDto: UpdateInterestDto,
  ) {
    const updatedInterest = await this.interestsService.update(
      id,
      updateInterestDto,
    );

    return updatedInterest;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedInterest = await this.interestsService.remove(id);

    return deletedInterest;
  }
}
