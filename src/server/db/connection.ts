import knex from 'knex';
import knexFile from '../../../knexfile';

const environment = process.env.NODE_ENV || 'development';

const myKnex = knex(knexFile[environment]);

export default myKnex;