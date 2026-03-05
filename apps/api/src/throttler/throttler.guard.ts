import {
  ExecutionContext,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard
  extends ThrottlerGuard
  implements OnModuleInit
{
  private loggedIps = new Map<string, number>();

  async onModuleInit(): Promise<void> {
    if (super.onModuleInit) {
      await super.onModuleInit();
    }

    setInterval(() => {
      const now = Date.now();
      let deletedCount = 0;

      for (const [ip, timestamp] of this.loggedIps.entries()) {
        if (now - timestamp > 3600000) {
          this.loggedIps.delete(ip);
          deletedCount++;
        }
      }

      if (deletedCount > 0) {
        Logger.log(
          `[Throttler Cleaner] Removed ${deletedCount} stale IPs from memory.`,
        );
      }
    }, 3600000);
  }

  protected async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: any,
  ): Promise<void> {
    const request = context.switchToHttp().getRequest();
    const userIp = request.ip;
    const userUrl = request.url;

    const now = Date.now();
    const lastLoggedTime = this.loggedIps.get(userIp) || 0;

    if (now - lastLoggedTime >= 60000) {
      Logger.warn(
        `Throttling limit exceeded for ${context.getClass().name}#${context.getHandler().name}. User IP: ${userIp}, URL: ${userUrl}, Limit: ${Math.round(throttlerLimitDetail.ttl / 1000)} seconds`,
      );
      this.loggedIps.set(userIp, now);
    }

    if (this.loggedIps.size > 5000) {
      Logger.warn(
        'Clearing logged IPs to prevent memory overflow. More than 5000 unique IPs have been logged.',
      );
      this.loggedIps.clear();
    }

    throw new ThrottlerException('Too many requests. Please try again later.');
  }
}
