import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CodeController } from './code.controller';
import { CodeService } from './code.service';

@Module({
  imports: [],
  controllers: [CodeController],
  providers: [CodeService, PrismaService],
})
export class CodeModule {}
