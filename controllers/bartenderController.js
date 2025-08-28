const Order = require('../models/orders');

const showQueue = async (req, res) => {
    const orders = await Order.getAllOrders();
    const pendingOrders = orders.filter(o => o.status === 'pending');
    const inProgressOrders = orders.filter(o => o.status === 'in-progress');
    const completedOrders = orders.filter(o => o.status === 'completed');
    res.render('bartender/queue', {
        pageTitle: 'Bartender Hub',
        pendingOrders,
        inProgressOrders,
        completedOrders
    });
};

const updateStatus = (req, res) => {
    const { orderId, newStatus } = req.body;
    Order.updateStatus(orderId, newStatus);
    res.redirect('/bartender/queue');
};

module.exports = {
    showQueue,  
    updateStatus
};