const db = require('../db/db'); // Adjust the path if your db connection file is elsewhere

// Retrieve all orders from the database, join with drinks to get drink names
async function getAllOrders() {
    try{
    const result = await db.query(`
            SELECT
                o.order_id,
                o.client_name,
                o.status,
                oi.quantity,
                d.name AS drink_name,
                d.price AS drink_price
            FROM "order" o
            JOIN order_item oi ON o.order_id = oi.order_id
            JOIN drink d ON oi.drink_id = d.id
        `);
    return result.rows;
    } catch (error) {
        console.error('Error fetching drinks:', error);
        return [];
    }
}

module.exports = {
    getAllOrders,
};