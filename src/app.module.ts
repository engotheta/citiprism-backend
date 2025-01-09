import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopsModule } from './modules/shops/shops.module';

@Module({
  imports: [ShopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
