const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/order', clientController.showMenu);
router.post('/order', clientController.placeOrder);

module.exports = router;