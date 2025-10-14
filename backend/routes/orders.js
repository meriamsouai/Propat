const express = require('express');
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get user order history
router.get('/history', authenticateToken, orderController.getOrderHistory);

// Create new order
router.post('/', authenticateToken, orderController.createOrder);

// Get specific order
router.get('/:orderId', authenticateToken, orderController.getOrder);

module.exports = router;