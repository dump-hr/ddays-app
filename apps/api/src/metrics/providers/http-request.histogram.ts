import { makeHistogramProvider } from '@willsoto/nestjs-prometheus';

export const HttpRequestDuration = makeHistogramProvider({
  name: 'http_request_duration_seconds',
  help: 'Request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.05, 0.1, 0.3, 1, 3, 5],
});
