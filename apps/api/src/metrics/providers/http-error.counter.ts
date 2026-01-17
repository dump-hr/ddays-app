import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

export const HttpErrorCounter = makeCounterProvider({
  name: 'http_error_total',
  help: 'Total HTTP errors',
  labelNames: ['method', 'route', 'status'],
});
