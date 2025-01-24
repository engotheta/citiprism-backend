import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    let label = 'Request-response time';

    console.time(label);
    res.on('finish', () => console.timeEnd(label));

    next();
  }
}
