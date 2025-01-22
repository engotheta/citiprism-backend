import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  autoLoadEntities: true,
  synchronize: true,
});

const getValidationSchema = () => {
  return Joi.object({
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),

    REQUEST_TIMEOUT: Joi.number().required(),
  });
};

export default registerAs('AppConfig', () => ({
  typeOrmModuleOptions: getTypeOrmModuleOptions(),

  environment: process.env.NODE_ENV || 'development',
  validationSchema: getValidationSchema(),
  apiKey: process.env.API_KEY,
  requestTimeout: +process.env.REQUEST_TIMEOUT,
}));
