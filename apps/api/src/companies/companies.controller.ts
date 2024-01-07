import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/auth/auth.dto';

import { SponsorAuthGuard } from '../auth/sponsor.guard';
import {
  AddSponsorDescriptionDto,
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
  @Patch('/description')
  async addDescription(
    @Req() req: AuthenticatedRequest,
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch('/logo')
  @UseInterceptors(FileInterceptor('file'))
  async addLogo(
    @Req() req: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const addedSponsorLogo = await this.companiesService.addLogo(
      +req.user.id,
      file,
    );

    return addedSponsorLogo;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch('/video')
  @UseInterceptors(FileInterceptor('file'))
  async addVideo(
    @Req() req: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'video/mp4' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 50 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const addedSponsorVideo = await this.companiesService.addVideo(
      +req.user.id,
      file,
    );

    return addedSponsorVideo;
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch('/landing-image')
  @UseInterceptors(FileInterceptor('file'))
  async addLandingImage(
    @Req() req: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const addedSponsorLandingImage =
      await this.companiesService.addLandingImage(+req.user.id, file);

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
  } //fun fact this returns an array with one element, not sure if that is good behaviour
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
