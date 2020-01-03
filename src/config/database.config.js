import { Sequelize } from 'sequelize';
import ENV from './environment.config';

export default {
    default: new Sequelize(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, {
      dialect: 'mysql',
      host: ENV.DB_HOST,
      port: ENV.DB_PORT,
    }),
  };