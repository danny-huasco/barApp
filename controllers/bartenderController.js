const Order = require('../models/orders');
const employee = require('../models/employees');

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

const updateStatus = async (req, res) => {
    const { orderId, newStatus, employeeId } = req.body;
    const response = await Order.updateStatus(orderId, newStatus, employeeId);
    response.success===true ? res.redirect('/bartender/queue') : res.status(500).send(response.message);
};

const validateEmployee = async (req, res) => {
    const { code } = req.body;
    const emp = await employee.getEmployee(code);
    
    if (emp) {
        res.status(200).json(emp);
    } else {
        res.status(401).send('Invalid employee code');
    }
};
module.exports = {
    showQueue,  
    updateStatus,
    validateEmployee
};