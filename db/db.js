const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Test the connection
pool.connect((err, client, done) => {
    if (err) {
        console.error('Database connection error:', err.stack);
        return;
    }
    console.log('Successfully connected!');
    client.release(); 
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool: pool //for direct access 
};