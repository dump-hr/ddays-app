import { CompanyDto, CompanyModifyDto } from '@ddays-app/types';
import { Body, Controller, Post } from '@nestjs/common';

import { TestExceptionService } from './testException.service';

@Controller('test-exception')
export class TestExceptionController {
  constructor(private readonly testExceptionService: TestExceptionService) {}
  @Post()
  async create(@Body() dto: CompanyModifyDto): Promise<CompanyDto> {
    return await this.testExceptionService.create(dto);
  }
}
