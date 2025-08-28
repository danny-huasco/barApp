const db = require('../db/db'); // Adjust the path if your db connection file is elsewhere

// Retrieve all orders from the database
async function getAllDrinks() {
    try{
    const result = await db.query('SELECT * FROM drink');
    return result.rows;
    } catch (error) {
        console.error('Error fetching drinks:', error);
        return [];
    }
}

module.exports = {
    getAllDrinks,
};