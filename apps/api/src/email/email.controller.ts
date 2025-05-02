import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('generate-reset-token')
  async generateResetToken(@Body() { email }: { email: string }) {
    return this.emailService.sendPasswordResetEmail(email);
  }

  @Get('validate-reset-token')
  async validateResetToken(@Query('token') token: string) {
    return this.emailService.validatePasswordResetToken(token);
  }
}
