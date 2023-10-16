const { Pool } = require('pg');

const PG_URI = 'postgres://yibkegzb:KUFnrTtX6wgLVtOA7C0nuwi-Hn08VX7J@berry.db.elephantsql.com/yibkegzb';

const pool = new Pool({
    connectionString: PG_URI
});

pool.on('error', (err) => {
    console.error('DB error:', err);
})

module.exports = pool;