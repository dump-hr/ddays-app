import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/email/email.module';
import { PrismaService } from 'src/prisma.service';

import { AzureADStrategy } from './admin.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './sponsor.strategy';
import { UserGuard } from './user.guard';
import { UserJwtStrategy } from './user.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '14d' },
    }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    AzureADStrategy,
    AuthService,
    JwtStrategy,
    UserJwtStrategy,
    PrismaService,
    UserGuard,
  ],
  exports: [AuthService, UserGuard],
})
export class AuthModule {}
