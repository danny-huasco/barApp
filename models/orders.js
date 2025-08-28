const db = require('../db/db'); // Adjust the path if your db connection file is elsewhere

// Retrieve all orders from the database, join with drinks to get drink names
async function getAllOrders() {
    try{
    const result = await db.query(`
            SELECT  o.order_id,
                    o.client_name,
                    o.status,
                    oi.quantity,
                    d.name AS drink_name,
                    d.price AS drink_price,
                    e.name AS maker
                FROM _order o
                JOIN order_item oi ON o.order_id = oi.order_id
                JOIN drink d ON oi.drink_id = d.id
                left JOIN employee e ON oi.maker = e.code
        `);
    return result.rows;
    } catch (error) {
        console.error('Error fetching drinks:', error);
        return [];
    }
}

async function updateStatus(orderId, newStatus, employeeId) {
    try {
        // Update the order status
        const result = await db.query(
            'UPDATE _order SET status = $1 WHERE order_id = $2',
            [newStatus, orderId]
        );
        console.log('Order status updated:', result);
        if(result.rowCount>0) {
            return { success: true, message: 'Order status updated successfully' };
        } else {
            return { success: false, message: 'Failed to update order status' };
        }
    }catch (error) {
        console.error('Error updating order status:', error);
        return { success: false, message: 'Error updating order status' };
    }
};

const addOrder = async (client_name)=>{
    try {
        const result = await db.query(
            'INSERT INTO _order (client_name, status) VALUES ($1, $2) RETURNING order_id',
            [client_name, 'pending']
        );
        return result.rows[0].order_id; // Return the newly created order ID
    } catch (error) {
        console.error('Error adding order:', error);
        return null;
    }
}

const addOrderItem = async (orderId, drinkId, quantity) => {
    try {
        const result = await db.query(
            'INSERT INTO order_item (order_id, drink_id, quantity) VALUES ($1, $2, $3)',
            [orderId, drinkId, quantity]
        );
        return result.rowCount > 0; // Return true if the insert was successful
    } catch (error) {
        console.error('Error adding order item:', error);
        return false;
    }
};

module.exports = {
    getAllOrders,
    updateStatus,
    addOrder,
    addOrderItem
};