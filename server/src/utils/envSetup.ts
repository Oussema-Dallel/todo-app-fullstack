import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 4000;
const DB_USER = process.env.DB_USER ?? 'postgres';
const DB_HOST = process.env.DB_HOST ?? 'localhost';
const DB_NAME = process.env.DB_NAME ?? 'default_db';
const DB_PASS = process.env.DB_PASS ?? 'default_pass';
const DB_PORT: number = Number.parseInt(process.env.DB_PORT ?? '5432');

export { PORT, DB_USER, DB_HOST, DB_NAME, DB_PASS, DB_PORT };