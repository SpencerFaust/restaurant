const pg = require('pg');

const pool = pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'restaurant',
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('PostgreSQL Initialized');
});

pool.on('error', (error) => {
    console.log('PostgreSQL error:', error); 
});

module.exports = pool;