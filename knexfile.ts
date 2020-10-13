// Env 
import dotenv from 'dotenv';
dotenv.config();

// Lib
import path from 'path';

// Const
const BASE_PATH = path.join('.', 'src', 'server', 'db');
const ssl = `?ssl=true`

const knexFile = {
    test: {
        client: 'pg',
        connection: `postgres://${process.env.LOCAL_DB_USER}:${process.env.LOCAL_DB_PASS}@${process.env.LOCAL_DB_HOST}:5432/${process.env.LOCAL_DB_DB}${ssl}`,
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    development: {
        client: 'pg',
        connection: `postgres://${process.env.LOCAL_DB_USER}:${process.env.LOCAL_DB_PASS}@${process.env.LOCAL_DB_HOST}:5432/${process.env.LOCAL_DB_DB}${ssl}`,
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    production: {
        client: 'pg',
        connection: `${process.env.DATABASE_URL}${ssl}`,
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
};

export default knexFile;