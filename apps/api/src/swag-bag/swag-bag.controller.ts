import { SwagBagDto, SwagBagModifyDto } from '@ddays-app/types';
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
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { SponsorGuard } from 'src/auth/sponsor.guard';

import { SwagBagService } from './swag-bag.service';
import { SwagBagsModifyForCompanyDto } from './swagBag.dto';

@Controller('swag-bag')
export class SwagBagController {
  constructor(private readonly swagBagService: SwagBagService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: SwagBagModifyDto): Promise<SwagBagDto> {
    return await this.swagBagService.create(dto);
  }

  @Get('company/:id')
  async getForCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SwagBagDto[]> {
    return await this.swagBagService.getByCompany(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<SwagBagDto> {
    return await this.swagBagService.remove(id);
  }

  @UseGuards(SponsorGuard)
  @Patch('company')
  async updateForCompany(
    @Req() { user }: AuthenticatedRequest,
    @Body() { swagBags }: SwagBagsModifyForCompanyDto,
  ): Promise<SwagBagDto[]> {
    return await this.swagBagService.updateForCompany(user.id, swagBags);
  }
}
