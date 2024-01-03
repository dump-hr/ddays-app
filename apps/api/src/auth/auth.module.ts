import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';
import { CompaniesModule } from 'src/companies/companies.module';
import { CompaniesService } from 'src/companies/companies.service';

import { AzureADStrategy } from './admin.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './sponsor.service';
import { JwtStrategy } from './sponsor.strategy';

export const jwtSecret = env.JWT_SECRET;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '14d' },
    }),
    CompaniesModule,
  ],
  controllers: [AuthController],
  providers: [AzureADStrategy, AuthService, CompaniesService, JwtStrategy],
})
export class AuthModule {}
