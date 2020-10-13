// Env 
import dotenv from 'dotenv';
dotenv.config();

// Lib
import path from 'path';

// Const
const BASE_PATH = path.join('.', 'src', 'server', 'db');
const DB_URL = `postgres://zwjvfyynkixjbw:dfe9cacadb36434e41288d9e53dd2bf315c9ad9c00925e5e0fcf53ba4e8a70c9@ec2-34-235-62-201.compute-1.amazonaws.com:5432/deff8tb9v2f660`
const ssl = `?ssl=true`

const knexFile = {
    test: {
        client: 'pg',
        connection: `postgres://${process.env.LOCAL_DB_USER}:${process.env.LOCAL_DB_PASS}@${process.env.LOCAL_DB_HOST}:5432/${process.env.LOCAL_DB_DB}${ssl}`,
        // connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_DB}`,
        // connection: `${DB_URL}`,
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
        // connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_DB}`,
        // connection: `${DB_URL}`,
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    production: {
        client: 'pg',
        // connection: `postgres://${process.env.LOCAL_DB_USER}:${process.env.LOCAL_DB_PASS}@${process.env.LOCAL_DB_HOST}:5432/${process.env.LOCAL_DB_DB}`,
        // connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_DB}`,
        connection: `${DATABASE_URL}${ssl}`,
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
};

export default knexFile;