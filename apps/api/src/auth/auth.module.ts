import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AzureADStrategy } from './azure-ad.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'AzureAD',
    }),
  ],
  controllers: [],
  providers: [AzureADStrategy],
})
export class AuthModule {}
