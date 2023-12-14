import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';
import { CompaniesModule } from 'src/companies/companies.module';
import { CompaniesService } from 'src/companies/companies.service';

import { AuthService } from '../auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from '../auth.controller';

export const jwtSecret = env.JWT_SECRET;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
    CompaniesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CompaniesService, JwtStrategy],
})
export class AuthModule {}
