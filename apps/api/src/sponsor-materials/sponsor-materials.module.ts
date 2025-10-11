import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { SponsorMaterialsController } from './sponsor-materials.controller';
import { SponsorMaterialsService } from './sponsor-materials.service';

@Module({
  controllers: [SponsorMaterialsController],
  providers: [SponsorMaterialsService, PrismaService],
  imports: [],
})
export class SponsorMaterialsModule {}
