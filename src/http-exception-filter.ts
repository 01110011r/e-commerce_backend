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
      : Number((exception as {status: string|number}).status)||HttpStatus.INTERNAL_SERVER_ERROR;


    const message = exception instanceof HttpException
    ? exception.getResponse()
      : (exception as {message?:string}).message||(exception as {error?:string}).error||'';

    const logMsg=typeof message ==='object'
    ? JSON.stringify(message)
      : message;

    this.logger.error('Http status code: ' + status + ' Error Message: ' + logMsg);

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