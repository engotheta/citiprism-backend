import appConfig from './src/config/app.config';

module.exports = {
  ...appConfig().typeOrmModuleOptions(),

  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],

  cli: {
    migrationsDir: 'src/migrations',
  },
};
