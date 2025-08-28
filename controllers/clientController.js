const OrderModel = require('../models/orders');
const drinkModel = require('../models/drinks');

const showMenu = async (req, res) => {
    const drinks = await drinkModel.getAllDrinks();
    res.render('client/order', { pageTitle: 'Drinks Menu', drinks });
};

const placeOrder = async(req, res) => {
    const { client_name, order } = req.body;
   //add order to database
    const orderId = await OrderModel.addOrder(client_name);
    //use order id returned to insert order items
    console.log('New Order ID:', orderId);
    if(orderId){
        r=true;
        order.forEach(async (item) => {
            if(r){
            r = await OrderModel.addOrderItem(orderId, item.code, item.quantity);
            }else{
                res.status(500).send('Error placing order');
            }
        });
        res.status(200).send({ message: 'Order placed successfully', success:true });
    }else{
        res.status(500).send('Error placing order');
    }
};

module.exports = {
    showMenu,
    placeOrder
};