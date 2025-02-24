import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'development'
          ? ['error', 'warn', 'info', 'query']
          : ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
