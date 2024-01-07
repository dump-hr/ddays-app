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

import { SponsorAuthGuard } from '../auth/sponsor.guard';
import {
  AddSponsorLandingImageDto,
  AddSponsorLogoDto,
  AddSponsorVideoDto,
  CreateCompanyDto,
  UpdateCompanyDto,
  UpdateSponsorDescriptionDto,
} from './companies.dto';
import { CompaniesService } from './companies.service';

@ApiTags('company')
@Controller('company')
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
  @Get('/description')
  async getDescription(@Req() req: AuthenticatedRequest) {
    return await this.companiesService.getDescription(+req.user.id);
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/description')
  async updateDescription(
    @Req() req: AuthenticatedRequest,
    @Body() updateSponsorDescriptionDto: UpdateSponsorDescriptionDto,
  ) {
    const updatedCompany = await this.companiesService.updateDescription(
      +req.user.id,
      updateSponsorDescriptionDto,
    );

    return updatedCompany;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/logo')
  async addLogo(
    @Req() req: AuthenticatedRequest,
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
  @Patch('/video')
  async addVideo(
    @Req() req: AuthenticatedRequest,
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
  @Patch('/landing-image')
  async addLandingImage(
    @Body() addSponsorLandingImageDto: AddSponsorLandingImageDto,
    @Req() req: AuthenticatedRequest,
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
  @Delete('/description')
  async removeDescription(@Req() req: AuthenticatedRequest) {
    const removedSponsorDescription =
      await this.companiesService.removeDescription(req.user.id);

    return removedSponsorDescription;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/logo')
  async removeLogo(@Req() req: AuthenticatedRequest) {
    const removedSponsorLogo = await this.companiesService.removeLogo(
      req.user.id,
    );

    return removedSponsorLogo;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/video')
  async removeVideo(@Req() req: AuthenticatedRequest) {
    const removedSponsorVideo = await this.companiesService.removeVideo(
      req.user.id,
    );

    return removedSponsorVideo;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/landing-image')
  async removeLandingImage(@Req() req: AuthenticatedRequest) {
    const removedSponsorLandingImage =
      await this.companiesService.removeLandingImage(req.user.id);

    return removedSponsorLandingImage;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Get('/interests')
  async getMyInterests(@Req() req: AuthenticatedRequest) {
    const interests = await this.companiesService.getInterests(req.user.id);

    return interests;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Get('/sponsorFormStatus')
  async getSponsorFormStatus(@Req() req: AuthenticatedRequest) {
    const status = await this.companiesService.getSponsorFormStatus(
      req.user.id,
    );

    return status;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/interests/:interestId')
  async toggleInterest(
    @Req() req: AuthenticatedRequest,
    @Param('interestId', ParseIntPipe) interestId: number,
  ) {
    const updatedCompany = await this.companiesService.toggleInterest(
      req.user.id,
      interestId,
    );

    return updatedCompany;
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

  @Get(':id/interests')
  async getInterestsForCompany(@Param('id', ParseIntPipe) id: number) {
    const companies = await this.companiesService.getInterests(id);

    return companies;
  }
}
