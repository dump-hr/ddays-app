import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { SponsorAuthGuard } from 'src/auth/sponsor.guard';

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

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Get('/sponsor')
  async getByCompany(@Req() req: AuthenticatedRequest) {
    const interests = await this.interestsService.getForSponsor(+req.user.id);

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

  @Get(':id/companies')
  async getCompanies(@Param('id', ParseIntPipe) id: number) {
    const companies = await this.interestsService.getCompanies(id);

    return companies;
  }
}
