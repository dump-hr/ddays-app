import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { ServerClient } from 'postmark';
import { PrismaService } from 'src/prisma.service';

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

  async sendPasswordResetEmail(
    email: string,
  ): Promise<{ success: boolean; message: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email_isDeleted: {
          email,
          isDeleted: false,
        },
      },
    });

    if (!user) {
      return { success: false, message: 'Korisnik nije pronađen' };
    }

    const token = await this.generatePasswordResetToken(user.id);
    const appUrl = process.env.APP_URL || 'http://localhost:3005';
    const resetLink = `${appUrl}/app/password-reset/${token}`;

    try {
      await this.sendEmail(
        email,
        'DDays 2025 - Resetiranje lozinke',
        `Pozdrav, klikni na link ispod da resetiraš lozinku: ${resetLink}\n\nLink za resetiranje lozinke traje 15 minuta.`,
      );
      return {
        success: true,
        message: 'Email za resetiranje lozinke je poslan',
      };
    } catch (error) {
      console.error('Greška pri slanju emaila za resetiranje lozinke:', error);
      return { success: false, message: 'Greška pri slanju emaila' };
    }
  }

  async validatePasswordResetToken(
    token: string,
  ): Promise<{ valid: boolean; message?: string; userId?: number }> {
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

  async generateEmailConfirmationToken(userId: number): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // istice za 24 sata

    await this.prisma.emailConfirmationToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  async sendEmailConfirmation(
    email: string,
  ): Promise<{ success: boolean; message: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email_isDeleted: {
          email,
          isDeleted: false,
        },
      },
    });

    if (!user) {
      return { success: false, message: 'Korisnik nije pronađen' };
    }

    const token = await this.generateEmailConfirmationToken(user.id);
    const appUrl = process.env.APP_URL || 'http://localhost:3005';
    const confirmationLink = `${appUrl}/app/confirm-email?token=${token}`;

    try {
      await this.sendEmail(
        email,
        'DDays 2025 - Potvrda email adrese',
        `Pozdrav, klikni na link ispod da potvrdiš svoju email adresu: ${confirmationLink}`,
      );
      return { success: true, message: 'Email za potvrdu je poslan' };
    } catch (error) {
      console.error('Greška pri slanju emaila za potvrdu:', error);
      return { success: false, message: 'Greška pri slanju emaila' };
    }
  }

  async validateEmailConfirmationToken(
    token: string,
  ): Promise<{ success: boolean; message: string }> {
    const confirmationToken =
      await this.prisma.emailConfirmationToken.findUnique({
        where: { token },
        include: { user: true },
      });

    if (!confirmationToken) {
      return { success: false, message: 'Token nije pronađen' };
    }

    if (confirmationToken.expiresAt < new Date()) {
      return { success: false, message: 'Token je istekao' };
    }

    await this.prisma.user.update({
      where: { id: confirmationToken.userId },
      data: { isConfirmed: true },
    });

    return { success: true, message: 'Email uspješno potvrđen' };
  }

  private async sendEmail(email: string, subject: string, text: string) {
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
