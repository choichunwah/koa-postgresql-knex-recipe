const path = require('path');
const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');
const XLSX = require('xlsx');

module.exports = {
    test: {
        client: 'pg',
        connection: 'postgres://wah:abcd1234@localhost:5432/koa-postgresql-knex-recipe',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    development: {
        client: 'pg',
        connection: 'postgres://wah:abcd1234@localhost:5432/koa-postgresql-knex-recipe',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
};