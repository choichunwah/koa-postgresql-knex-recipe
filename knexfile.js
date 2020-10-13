// Env 
import dotenv from 'dotenv';
dotenv.config();

// Lib
import path from 'path';

// Const
const BASE_PATH = path.join('.', 'src', 'server', 'db');
const DATABASE_URL = `postgres://zwjvfyynkixjbw:dfe9cacadb36434e41288d9e53dd2bf315c9ad9c00925e5e0fcf53ba4e8a70c9@ec2-34-235-62-201.compute-1.amazonaws.com:5432/deff8tb9v2f660`;

const knexFile = {
    test: {
        client: 'pg',
        connection: `${DATABASE_URL}`,
        // connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/koa-postgresql-knex-recipe`,
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    development: {
        client: 'pg',
        connection: `${DATABASE_URL}`,
        // connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/koa-postgresql-knex-recipe`,
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
};

export default knexFile;