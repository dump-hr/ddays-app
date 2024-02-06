import {
  InterestConnectToCompanyDto,
  InterestDto,
  InterestModifyDto,
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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { SponsorGuard } from 'src/auth/sponsor.guard';

import { InterestService } from './interest.service';

@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @UseGuards(SponsorGuard)
  @ApiBearerAuth()
  @Patch('/company')
  async connectToCompany(
    @Req() { user }: AuthenticatedRequest,
    @Body() { interestIds }: InterestConnectToCompanyDto,
  ): Promise<InterestDto[]> {
    return await this.interestService.connectToCompany(user.id, interestIds);
  }

  @Post()
  async create(@Body() dto: InterestModifyDto): Promise<InterestDto> {
    return await this.interestService.create(dto);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<InterestDto> {
    return await this.interestService.getOne(id);
  }

  @Get()
  async getAll(): Promise<InterestDto[]> {
    return await this.interestService.getAll();
  }

  @Get('company/:id')
  async getForCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InterestDto[]> {
    return await this.interestService.getForCompany(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<InterestDto> {
    return await this.interestService.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: InterestModifyDto,
  ): Promise<InterestDto> {
    return await this.interestService.update(id, dto);
  }
}
