import HapiSequelize from 'hapi-sequelizejs';
import HapiRouter from 'hapi-router';
import Database from './database.config';

export default () => ([
    {
        plugin: HapiSequelize,
        options: [
            {
                name: 'trabalhofacef',
                models: [
                    './src/api/**/**.models.js'
                ],
                sequelize: Database.default,
                sync: true
            }
        ]
    },
    {
        plugin: HapiRouter,
        options: {
            routes: 'src/api/**/**.routes.js'
        }
    }
]);