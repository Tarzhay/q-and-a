const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'dnguyen',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432,
})
