// Env 
import dotenv from 'dotenv';
dotenv.config();

// Lib
import path from 'path';

// Const
const BASE_PATH = path.join('.', 'src', 'server', 'db');


const knexFile = {
    test: {
        client: 'pg',
        // connection: `postgres://${process.env.DATABASE_URL}`,
        connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/koa-postgresql-knex-recipe`,
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    development: {
        client: 'pg',
        // connection: `postgres://${process.env.DATABASE_URL}`,
        connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/koa-postgresql-knex-recipe`,
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
};

export default knexFile;