const Order = require('../models/drinks');

const showMenu = async (req, res) => {
    const drinks = await Order.getAllDrinks();
    res.render('client/order', { pageTitle: 'Drinks Menu', drinks });
};

const placeOrder = (req, res) => {
    const { clientName, drink } = req.body;
    Order.addOrder(clientName, drink);
    res.redirect('/client/order');
};

module.exports = {
    showMenu,
    placeOrder
};