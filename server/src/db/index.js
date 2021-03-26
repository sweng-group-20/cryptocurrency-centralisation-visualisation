const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'db',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  max: 20,
});

const query = (queryString, params) => pool.query(queryString, params);
const getClient = () => pool.connect();

const db = {
  query,
  getClient,
};
Object.freeze(db);

module.exports = db;
