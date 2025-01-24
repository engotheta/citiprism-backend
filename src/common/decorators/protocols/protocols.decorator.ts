import { SetMetadata } from '@nestjs/common';

export const Protocols = (...args: string[]) => SetMetadata('protocols', args);
