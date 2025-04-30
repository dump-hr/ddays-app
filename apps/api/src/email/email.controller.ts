import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { PrismaService } from 'src/prisma.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('send')
  async sendEmail(
    @Body()
    { email, text, subject }: { email: string; text: string; subject: string },
  ) {
    return this.emailService.sendEmail(email, subject, text);
  }

  @Post('generate-reset-token')
  async generateResetToken(@Body() { email }: { email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email_isDeleted: {
          email,
          isDeleted: false,
        },
      },
    });

    if (!user) {
      return { error: 'Korisnik nije pronađen' };
    }

    const token = await this.emailService.generatePasswordResetToken(user.id);
    return { token };
  }

  @Get('validate-reset-token')
  async validateResetToken(@Query('token') token: string) {
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) {
      return { valid: false, message: 'Nevažeći token' };
    }

    if (resetToken.expiresAt < new Date()) {
      return { valid: false, message: 'Token je istekao' };
    }

    return { valid: true, userId: resetToken.userId };
  }
}
