import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const exceptionRes = exception.getResponse();
    const error = typeof res === 'string' ? { message: exceptionRes } : (exceptionRes as object);

    const resMod = {
      ...error,
      line: 'one liner master',
      timeStamp: new Date().toISOString(),
    };

    res.status(exception.getStatus()).json(resMod);
  }
}
