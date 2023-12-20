import DataBase from './db.class.js';
import 'dotenv/config';
const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;

const dbUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const db = new DataBase(dbUrl);

export default db;