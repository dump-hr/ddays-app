import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, PrismaService],
})
export class EmailModule {}
