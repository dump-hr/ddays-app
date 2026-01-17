import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import { tap } from 'rxjs/operators';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('http_request_duration_seconds')
    public readonly histogram: Histogram<string>,

    @InjectMetric('http_error_total')
    public readonly errorCounter: Counter<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const start = process.hrtime();

    return next.handle().pipe(
      tap(() => {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        if (!req || !res) return;

        const diff = process.hrtime(start);
        const seconds = diff[0] + diff[1] / 1e9;

        this.histogram
          .labels(
            req.method,
            req.route?.path ?? 'unknown',
            String(res.statusCode),
          )
          .observe(seconds);
      }),
    );
  }
}
