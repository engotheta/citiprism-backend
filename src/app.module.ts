import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopsModule } from './modules/shops/shops.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
      validationSchema: appConfig().validationSchema,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigType<typeof appConfig>) => ({ ...config.typeOrmModuleOptions }),
      inject: [appConfig.KEY],
    }),

    ShopsModule,
    ProductsModule,
    UsersModule,
    EventsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // console.log(process.env, '0'); //
  }
}
