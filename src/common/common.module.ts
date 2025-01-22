import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { ResponseWrapperInterceptor } from './interceptors/response-wrapper.interceptor';

@Module({
  providers: [
    // { provide: APP_GUARD, useClass: ApiKeyGuard }, // handle authorization
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseWrapperInterceptor },
  ],
})
export class CommonModule {}
