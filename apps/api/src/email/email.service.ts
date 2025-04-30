import { Injectable } from '@nestjs/common';
import { ServerClient } from 'postmark';
import { PrismaService } from 'src/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class EmailService {
  private readonly client: ServerClient;

  constructor(private readonly prisma: PrismaService) {
    const postmarkToken = process.env.POSTMARK_API_TOKEN;
    if (!postmarkToken) {
      throw new Error('POSTMARK_API_TOKEN nije postavljen');
    }
    this.client = new ServerClient(postmarkToken);
  }

  async generatePasswordResetToken(userId: number): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // istice za 15 minuta

    await this.prisma.passwordResetToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  async sendEmail(email: string, subject: string, text: string) {
    try {
      console.log('Pokušaj slanja emaila:', { email, subject, text });

      const fromEmail = process.env.POSTMARK_FROM_EMAIL;
      if (!fromEmail) {
        throw new Error('POSTMARK_FROM_EMAIL nije postavljen');
      }

      const result = await this.client.sendEmail({
        From: fromEmail,
        To: email,
        Subject: subject,
        TextBody: text,
      });

      console.log('Email uspješno poslan:', result);
      return { success: true, message: 'Email uspješno poslan' };
    } catch (error) {
      console.error('Greška pri slanju emaila:', error);
      throw error;
    }
  }
}
