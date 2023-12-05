import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const createdCompany = await this.companiesService.create(createCompanyDto);
    return createdCompany;
  }

  @Get()
  async getAll() {
    const company = await this.companiesService.getAll();
    return company;
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companiesService.getOne(+id);
    return company;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const updatedCmopany = await this.companiesService.update(
      +id,
      updateCompanyDto,
    );
    return updatedCmopany;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedCompany = await this.companiesService.remove(+id);

    return deletedCompany;
  }
}
