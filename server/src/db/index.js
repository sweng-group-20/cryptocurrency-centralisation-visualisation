const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'db',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const query = (queryString, params) => pool.query(queryString, params);
Object.freeze(query);

module.exports = { query };
