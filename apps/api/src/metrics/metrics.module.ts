import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'; // <--- Import this
import { PrometheusModule as WPrometheusModule } from '@willsoto/nestjs-prometheus';

import { MetricsInterceptor } from './metrics.interceptor';
import { HttpErrorCounter } from './providers/http-error.counter';
import { HttpRequestDuration } from './providers/http-request.histogram';

@Module({
  imports: [
    WPrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  providers: [
    HttpRequestDuration,
    MetricsInterceptor,
    HttpErrorCounter,
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
  exports: [WPrometheusModule, HttpRequestDuration, MetricsInterceptor],
})
export class MetricsModule {}
