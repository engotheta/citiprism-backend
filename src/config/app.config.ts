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

const getTypeOrmValidationSchema = () => {
  return Joi.object({
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
  });
};

export default registerAs('AppConfig', () => ({
  environment: process.env.NODE_ENV || 'development',
  typeOrmModuleOptions: getTypeOrmModuleOptions(),
  typeOrmValidationSchema: getTypeOrmValidationSchema(),
  apiKey: process.env.API_KEY,
}));
