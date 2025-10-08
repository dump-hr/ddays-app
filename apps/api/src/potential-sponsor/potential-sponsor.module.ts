import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { PotentialSponsorController } from './potential-sponsor.controller';
import { PotentialSponsorService } from './potential-sponsor.service';

@Module({
  controllers: [PotentialSponsorController],
  providers: [PotentialSponsorService, PrismaService],
  imports: [],
})
export class PotentialSponsorModule {}
