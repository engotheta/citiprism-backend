import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { ResponseWrapperInterceptor } from './interceptors/response-wrapper.interceptor';
import { LoggingMiddleware } from './middlewares/logging.middleware';

@Module({
  providers: [
    // anything put here is global // beware of pipes
    // { provide: APP_GUARD, useClass: ApiKeyGuard }, // handle authorization
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseWrapperInterceptor },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
