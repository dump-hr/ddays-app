import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BlobModule } from 'src/blob/blob.module';
import { CompanyModule } from 'src/company/company.module';
import { CompanyService } from 'src/company/company.service';

import { AzureADStrategy } from './admin.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './sponsor.service';
import { JwtStrategy } from './sponsor.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '14d' },
    }),
    CompanyModule,
    BlobModule,
  ],
  controllers: [AuthController],
  providers: [AzureADStrategy, AuthService, CompanyService, JwtStrategy],
})
export class AuthModule {}
