const db = require('../db/db'); 

// Retrieve employee details based on the provided code
async function getEmployee(code) {
    try {
        const result = await db.query('SELECT * FROM employee WHERE code = $1', [code]);
        return result.rows[0]; // Return the first matching employee or undefined if not found
    } catch (error) {
        console.error('Error fetching employee:', error);
        return null;
    }
};

module.exports = {
    getEmployee    
};