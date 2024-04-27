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
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthenticatedRequest } from 'src/auth/auth.dto';

import { SponsorGuard } from '../auth/sponsor.guard';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CompanyModifyDto): Promise<CompanyDto> {
    return await this.companyService.create(dto);
  }

  @Get()
  async getAllPublic(): Promise<CompanyPublicDto[]> {
    return await this.companyService.getAllPublic();
  }

  @UseGuards(SponsorGuard)
  @Get('current')
  async getCurrentPublic(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<CompanyPublicDto> {
    return await this.companyService.getOnePublic(user.id);
  }

  @UseGuards(AdminGuard)
  @Get('include-sensitive-info/:id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<CompanyDto> {
    return await this.companyService.getOne(id);
  }

  @UseGuards(SponsorGuard)
  @ApiBearerAuth()
  @Delete('/landing-image')
  async removeLandingImage(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<void> {
    return await this.companyService.removeLandingImage(user.id);
  }

  @UseGuards(SponsorGuard)
  @ApiBearerAuth()
  @Delete('/landing-image-company-culture')
  async removeLandingImageCompanyCulture(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<void> {
    return await this.companyService.removeLandingImageCompanyCulture(user.id);
  }

  @UseGuards(SponsorGuard)
  @ApiBearerAuth()
  @Delete('/book-of-standards')
  async removeBookOfStandards(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<void> {
    return await this.companyService.removeBookOfStandards(user.id);
  }

  @UseGuards(SponsorGuard)
  @ApiBearerAuth()
  @Delete('/logo-image')
  async removeLogoImage(@Req() { user }: AuthenticatedRequest) {
    return await this.companyService.removeLogoImage(user.id);
  }

  @UseGuards(SponsorGuard)
  @ApiBearerAuth()
  @Delete('/video')
  async removeVideo(@Req() { user }: AuthenticatedRequest) {
    return await this.companyService.removeVideo(user.id);
  }

  @UseGuards(SponsorGuard)
  @ApiBearerAuth()
  @Patch('/description')
  async updateDescription(
    @Req() { user }: AuthenticatedRequest,
    @Body() data: CompanyModifyDescriptionDto,
  ) {
    return await this.companyService.updateDescription(user.id, data);
  }

  @UseGuards(SponsorGuard)
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

  @UseGuards(SponsorGuard)
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
  @Patch('/landing-image-company-culture')
  @UseInterceptors(FileInterceptor('file'))
  async updateLandingImageCompanyCulture(
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
    return await this.companyService.updateLandingImageCompanyCulture(
      user.id,
      file,
    );
  }

  @UseGuards(SponsorGuard)
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
  @Patch('/logo-image')
  @UseInterceptors(FileInterceptor('file'))
  async updateLogoImage(
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
    return await this.companyService.updateLogoImage(user.id, file);
  }

  @UseGuards(SponsorGuard)
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
  @Patch('/book-of-standards')
  @UseInterceptors(FileInterceptor('file'))
  async updateBookOfStandards(
    @Req() { user }: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'pdf' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    return await this.companyService.updateBookOfStandards(user.id, file);
  }

  @UseGuards(SponsorGuard)
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

  @UseGuards(SponsorGuard)
  @Put('booth/:id')
  async reserveBoothLocation(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user }: AuthenticatedRequest,
  ) {
    return await this.companyService.reserveBoothLocation(user.id, id);
    //TODO: add socket response
  }

  @Get(':id')
  async getOnePublic(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompanyPublicDto> {
    return await this.companyService.getOnePublic(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CompanyModifyDto,
  ) {
    return await this.companyService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<CompanyDto> {
    return await this.companyService.remove(id);
  }
}
