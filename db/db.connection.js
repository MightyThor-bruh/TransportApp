import DataBase from './db.class.js';

const dbUrl = 'mongodb://localhost:27017/testdb';
const db = new DataBase(dbUrl);

export default db;