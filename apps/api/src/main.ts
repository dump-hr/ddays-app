import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { AppModule } from './app.module';

const setupClassValidator = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
};

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('DDays API')
    .setDescription('Backend for DDays application')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);
};

const setupProxies = (app: INestApplication) => {
  if (process.env.NODE_ENV === 'dev') {
    app.use(
      '/',
      createProxyMiddleware(
        (pathname: string) =>
          !pathname.startsWith('/api') &&
          !pathname.startsWith('/admin-old') &&
          !pathname.startsWith('/sponsor') &&
          !pathname.startsWith('/app') &&
          !pathname.startsWith('/admin'),
        { target: 'http://localhost:3004' },
      ),
    );

    app.use(
      '/admin-old',
      createProxyMiddleware({ target: 'http://localhost:3002' }),
    );

    app.use(
      '/sponsor',
      createProxyMiddleware({ target: 'http://localhost:3003' }),
    );

    app.use(
      '/app',
      createProxyMiddleware({
        target: 'http://localhost:3005',
      }),
    );

    app.use(
      '/admin',
      createProxyMiddleware({
        target: 'http://localhost:3006',
      }),
    );
  }
};

const run = async (app: INestApplication) => {
  const port = process.env.PORT || 3000;
  const database = new URL(process.env.DATABASE_URL).pathname.slice(1);

  await app.listen(port);

  console.log(`Connected to "${database}" database`);
  console.log(`Application is running on: http://localhost:${port}`);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  setupClassValidator(app);
  setupSwagger(app);
  setupProxies(app);

  await run(app);
}
bootstrap();
