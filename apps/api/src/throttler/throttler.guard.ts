import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: any,
  ): Promise<void> {
    const request = context.switchToHttp().getRequest();
    const userIp = request.ip;
    const userUrl = request.url;

    Logger.warn(
      `Throttling limit exceeded for ${context.getClass().name}#${context.getHandler().name}. User IP: ${userIp}, URL: ${userUrl}, Limit: ${Math.round(throttlerLimitDetail.ttl / 1000)} seconds`,
    );

    throw new ThrottlerException('Too many requests. Please try again later.');
  }
}
