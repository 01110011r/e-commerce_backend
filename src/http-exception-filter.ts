import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch()
@Injectable()
export class AllHttpExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger(AllHttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
    ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
    ? exception.getResponse()
      : 'Internal server error';

    this.logger.error('Http status code: ' + status + 'Error Message: ' + JSON.stringify(message));

    res
      .status(status)
      .json({
        status,
        method: req.method,
        timestamp: new Date().toISOString(),
        path: req.url,
        message
      });
  }

}