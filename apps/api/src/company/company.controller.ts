import {
  CompanyDto,
  CompanyModifyDescriptionDto,
  CompanyModifyDto,
  CompanyPublicDto,
} from '@ddays-app/types';
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
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/auth/auth.dto';

import { SponsorAuthGuard } from '../auth/sponsor.guard';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() dto: CompanyModifyDto): Promise<CompanyDto> {
    return await this.companyService.create(dto);
  }

  @Get()
  async getAllPublic(): Promise<CompanyPublicDto[]> {
    return await this.companyService.getAllPublic();
  }

  @Get('include-sensitive-info/:id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<CompanyDto> {
    return await this.companyService.getOne(id);
  }

  @Get(':id')
  async getOnePublic(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompanyPublicDto> {
    return await this.companyService.getOnePublic(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<CompanyDto> {
    return await this.companyService.remove(id);
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/landing-image')
  async removeLandingImage(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<void> {
    return await this.companyService.removeLandingImage(user.id);
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/logo')
  async removeLogo(@Req() { user }: AuthenticatedRequest) {
    return await this.companyService.removeLogo(user.id);
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Delete('/video')
  async removeVideo(@Req() { user }: AuthenticatedRequest) {
    return await this.companyService.removeVideo(user.id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CompanyModifyDto,
  ) {
    return await this.companyService.update(id, dto);
  }

  @UseGuards(SponsorAuthGuard)
  @ApiBearerAuth()
  @Patch('/description')
  async updateDescription(
    @Req() { user }: AuthenticatedRequest,
    @Body() { description }: CompanyModifyDescriptionDto,
  ) {
    return await this.companyService.updateDescription(user.id, description);
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
  async updateLandingImage(
    @Req() { user }: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    return await this.companyService.updateLandingImage(user.id, file);
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
  async updateLogo(
    @Req() { user }: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    return await this.companyService.updateLogo(user.id, file);
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
  async updateVideo(
    @Req() { user }: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'video/mp4' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 75 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    return await this.companyService.updateVideo(user.id, file);
  }
}