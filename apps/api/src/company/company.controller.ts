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
  CreateCompanyDto,
  UpdateCompanyDto,
  UpdateSponsorDescriptionDto,
} from './companies.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

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
    const addedSponsorLandingImage = await this.companyService.addLandingImage(
      +req.user.id,
      file,
    );

    return addedSponsorLandingImage;
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
    const addedSponsorLogo = await this.companyService.addLogo(
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
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 75 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const addedSponsorVideo = await this.companyService.addVideo(
      +req.user.id,
      file,
    );

    return addedSponsorVideo;
  }
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const createdCompany = await this.companyService.create(createCompanyDto);
    return createdCompany;
  }

  @Get()
  async getAll() {
    const company = await this.companyService.getAll();
    return company;
  }

  @Get('/companies/:id')
  async getCompaniesWithInterest(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companyService.getCompaniesWIthInterest(id);

    return company;
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Get('/description')
  async getDescription(@Req() req: AuthenticatedRequest) {
    return await this.companyService.getDescription(+req.user.id);
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Get('/logged')
  async getLogged(@Req() req: AuthenticatedRequest) {
    const company = await this.companyService.getOne(req.user.id);
    return company;
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companyService.getOne(id);

    return company;
  }
  @ApiBearerAuth()
  @Get('/sponsor-data')
  async getSponsorData(@Req() req: AuthenticatedRequest) {
    const company = await this.companyService.getOne(req.user.id);
    return company;
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Get('/sponsorFormStatus')
  async getSponsorFormStatus(@Req() req: AuthenticatedRequest) {
    const status = await this.companyService.getSponsorFormStatus(req.user.id);

    return status;
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedCompany = await this.companyService.remove(id);

    return deletedCompany;
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/description')
  async removeDescription(@Req() req: AuthenticatedRequest) {
    const removedSponsorDescription =
      await this.companyService.removeDescription(req.user.id);

    return removedSponsorDescription;
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/landing-image')
  async removeLandingImage(@Req() req: AuthenticatedRequest) {
    const removedSponsorLandingImage =
      await this.companyService.removeLandingImage(req.user.id);

    return removedSponsorLandingImage;
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/logo')
  async removeLogo(@Req() req: AuthenticatedRequest) {
    const removedSponsorLogo = await this.companyService.removeLogo(
      req.user.id,
    );

    return removedSponsorLogo;
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/video')
  async removeVideo(@Req() req: AuthenticatedRequest) {
    const removedSponsorVideo = await this.companyService.removeVideo(
      req.user.id,
    );

    return removedSponsorVideo;
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/interests/:interestId')
  async toggleInterest(
    @Req() req: AuthenticatedRequest,
    @Param('interestId', ParseIntPipe) interestId: number,
  ) {
    const updatedCompany = await this.companyService.toggleInterest(
      req.user.id,
      interestId,
    );

    return updatedCompany;
  }
  @Patch('/:id') //TODO: If theese deafault CRUDS are kept, then we also need to make specific admin guards
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const updatedCmopany = await this.companyService.update(
      id,
      updateCompanyDto,
    );

    return updatedCmopany;
  }
  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/description')
  async updateDescription(
    @Req() req: AuthenticatedRequest,
    @Body() updateSponsorDescriptionDto: UpdateSponsorDescriptionDto,
  ) {
    const updatedCompany = await this.companyService.updateDescription(
      +req.user.id,
      updateSponsorDescriptionDto,
    );

    return updatedCompany;
  }
}
