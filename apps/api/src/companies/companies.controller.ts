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

import {
  AddSponsorDescriptionDto,
  AddSponsorLandingImageDto,
  AddSponsorLogoDto,
  AddSponsorVideoDto,
  CreateCompanyDto,
  UpdateCompanyDto,
} from './companies.dto';
import { CompaniesService } from './companies.service';
@ApiTags('companies')
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
    const company = await this.companiesService.getOne(id);
    return company;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const updatedCmopany = await this.companiesService.update(
      id,
      updateCompanyDto,
    );
    return updatedCmopany;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedCompany = await this.companiesService.remove(id);

    return deletedCompany;
  }

  @Patch(':id/sponsor-description')
  async addSponsorDescription(
    @Param('id', ParseIntPipe) id: number,
    @Body() addSponsorDescriptionDto: AddSponsorDescriptionDto,
  ) {
    const addedSponsorDescription = await this.companiesService.addDescription(
      id,
      addSponsorDescriptionDto,
    );

    return addedSponsorDescription;
  }

  @Patch(':id/sponsor-logo')
  async addSponsorLogo(
    @Param('id', ParseIntPipe) id: number,
    @Body() addSponsorLogoDto: AddSponsorLogoDto,
  ) {
    const addedSponsorLogo = await this.companiesService.addLogo(
      id,
      addSponsorLogoDto,
    );

    return addedSponsorLogo;
  }

  @Patch(':id/sponsor-video')
  async addSponsorVideo(
    @Param('id', ParseIntPipe) id: number,
    @Body() addSponsorVideoDto: AddSponsorVideoDto,
  ) {
    const addedSponsorVideo = await this.companiesService.addVideo(
      id,
      addSponsorVideoDto,
    );

    return addedSponsorVideo;
  }

  @Patch(':id/sponsor-landing-image')
  async addSponsorLandingImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() addSponsorLandingImageDto: AddSponsorLandingImageDto,
  ) {
    const addedSponsorLandingImage =
      await this.companiesService.addLandingImage(
        id,
        addSponsorLandingImageDto,
      );

    return addedSponsorLandingImage;
  }
}
