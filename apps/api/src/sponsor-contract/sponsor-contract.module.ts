import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { SponsorContractController } from './sponsor-contract.controller';
import { SponsorContractService } from './sponsor-contract.service';

@Module({
  controllers: [SponsorContractController],
  providers: [SponsorContractService, PrismaService],
  imports: [],
})
export class SponsorContractModule {}
