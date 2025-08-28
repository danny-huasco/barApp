const express = require('express');
const router = express.Router();
const bartenderController = require('../controllers/bartenderController');


router.post('/init', bartenderController.validateEmployee);
router.get('/queue', bartenderController.showQueue);
router.post('/update-status', bartenderController.updateStatus);

module.exports = router;