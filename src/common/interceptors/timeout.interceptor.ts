import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';
import appConfig from 'src/config/app.config';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    ///
    return next.handle().pipe(
      timeout(this.config.requestTimeout),

      catchError(er => {
        return throwError(() => (er instanceof TimeoutError ? new RequestTimeoutException() : er));
      })
    );
  }
}
