import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as migrator from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import postgres from 'postgres';

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

const setupFrontendDevServerProxies = (app: INestApplication) => {
  if (process.env.NODE_ENV !== 'dev') return;

  app.use(
    '/admin',
    createProxyMiddleware({
      target: 'http://localhost:3002',
    }),
  );

  app.use(
    '/sponsor',
    createProxyMiddleware({
      target: 'http://localhost:3003',
    }),
  );
};

const migrate = async () => {
  const sql = postgres(process.env.DATABASE_URL, {
    max: 1,
  });

  await migrator.migrate(drizzle(sql), { migrationsFolder: './db/migrations' });
};

const run = async (app: INestApplication) => {
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupClassValidator(app);
  setupSwagger(app);
  setupFrontendDevServerProxies(app);

  await migrate();
  await run(app);
}
bootstrap();
