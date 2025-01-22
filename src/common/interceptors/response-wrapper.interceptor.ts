import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export enum AppHttpStatus {
  SUCCESS = 900,
}

export type StatusCode = HttpStatus | AppHttpStatus;
export interface AppResponse {
  data: any;
  message: string;
  success: boolean;

  statusCode: StatusCode;
  error: string;
  timeStamp: any;
}

@Injectable()
export class ResponseWrapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        //
        const response: Partial<AppResponse> = {
          data,
          success: true,
          statusCode: 900,
          timeStamp: new Date().toISOString(),
        };

        return response;
      })
    );
  }
}
