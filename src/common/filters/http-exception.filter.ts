import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppResponse } from '../interceptors/response-wrapper.interceptor';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const req = host.switchToHttp().getRequest<Request>();
    const exceptionRes = exception.getResponse();
    const error: any = typeof exceptionRes === 'string' ? { message: exceptionRes } : exceptionRes;

    const resMod: Partial<AppResponse> = {
      ...error,
      success: false,
      timeStamp: new Date().toISOString(), //
      url: req.url,
    };

    if (!resMod.statusCode) resMod.statusCode = exception.getStatus();
    res.status(exception.getStatus()).json(resMod);
  }
}
