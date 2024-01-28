import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostgresError } from 'postgres';

@Catch(PostgresError)
export class PostgresErrorFilter implements ExceptionFilter {
  catch(exception: PostgresError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.detail;

    response.status(500).json({
      statusCode: 500,
      message: message,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
