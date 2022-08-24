// this config is useful for localhosting only
import {Dialect} from 'sequelize/types';

const dialect: Dialect = 'postgres';
export default {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'root',
    DB: 'testdb',
    dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
