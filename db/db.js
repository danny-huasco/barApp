const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false // Set to true if using SSL on host
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