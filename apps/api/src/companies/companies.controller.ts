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

import { SponsorAuthGuard } from '../auth/sponsor/jwt-auth-guard';
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

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/sponsor-description')
  async addSponsorDescription(
    @Req() req: any,
    @Body() addSponsorDescriptionDto: AddSponsorDescriptionDto,
  ) {
    const addedSponsorDescription = await this.companiesService.addDescription(
      +req.user.id,
      addSponsorDescriptionDto,
    );

    return addedSponsorDescription;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/sponsor-logo')
  async addSponsorLogo(
    @Req() req: any,
    @Body() addSponsorLogoDto: AddSponsorLogoDto,
  ) {
    const addedSponsorLogo = await this.companiesService.addLogo(
      +req.user.id,
      addSponsorLogoDto,
    );

    return addedSponsorLogo;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/sponsor-video')
  async addSponsorVideo(
    @Req() req: any,
    @Body() addSponsorVideoDto: AddSponsorVideoDto,
  ) {
    const addedSponsorVideo = await this.companiesService.addVideo(
      req.user.id,
      addSponsorVideoDto,
    );

    return addedSponsorVideo;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/sponsor-landing-image')
  async addSponsorLandingImage(
    @Body() addSponsorLandingImageDto: AddSponsorLandingImageDto,
    @Req() req: any,
  ) {
    const addedSponsorLandingImage =
      await this.companiesService.addLandingImage(
        req.user.id,
        addSponsorLandingImageDto,
      );

    return addedSponsorLandingImage;
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/sponsor-description')
  async removeSponsorDescription(@Req() req: any) {
    const removedSponsorDescription =
      await this.companiesService.removeDescription(req.user.id);

    return removedSponsorDescription;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/sponsor-logo')
  async removeSponsorLogo(@Req() req: any) {
    const removedSponsorLogo = await this.companiesService.removeLogo(
      req.user.id,
    );

    return removedSponsorLogo;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/sponsor-video')
  async removeSponsorVideo(@Req() req: any) {
    const removedSponsorVideo = await this.companiesService.removeVideo(
      req.user.id,
    );

    return removedSponsorVideo;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/sponsor-landing-image')
  async removeSponsorLandingImage(@Req() req: any) {
    const removedSponsorLandingImage =
      await this.companiesService.removeLandingImage(req.user.id);

    return removedSponsorLandingImage;
  }
  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companiesService.getOne(id);
    return company;
  }

  @Patch('/:id') //TODO: If theese deafault CRUDS are kept, then we also need to make specific admin guards
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
}
