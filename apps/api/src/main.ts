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
import { join } from 'path';
import postgres from 'postgres';

import { AppModule } from './app.module';
import { PostgresErrorFilter } from './postgres-error.filter';

const setupClassValidator = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
};

const setupFilter = (app: INestApplication) => {
  app.useGlobalFilters(new PostgresErrorFilter());
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
          !pathname.startsWith('/admin') &&
          !pathname.startsWith('/sponsor') &&
          !pathname.startsWith('/app'),
        { target: 'http://localhost:3004' },
      ),
    );

    app.use(
      '/admin',
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
  }
};

const migrate = async () => {
  if (process.env.RUN_MIGRATIONS_ON_STARTUP !== 'true') return;

  const sql = postgres(process.env.DATABASE_URL, {
    max: 1,
  });

  console.log(join(__dirname, '..', '..', 'db', 'migrations'));

  await migrator.migrate(drizzle(sql), {
    migrationsFolder: join(__dirname, '..', '..', 'db', 'migrations'),
  });
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
  setupFilter(app);
  setupSwagger(app);
  setupProxies(app);

  try {
    await migrate();
  } catch {}
  await run(app);
}
bootstrap();
