const express = require('express');
const customizationController = require('../controllers/customizationController');
const authenticateToken = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// User routes
router.post('/', authenticateToken, customizationController.upload.single('logoFile'), customizationController.createCustomizationOrder);
router.get('/my-orders', authenticateToken, customizationController.getUserCustomizationOrders);
router.get('/:orderId', authenticateToken, customizationController.getCustomizationOrder);
router.post('/:orderId/reorder', authenticateToken, customizationController.reorderCustomization);

// Admin routes
router.get('/admin/orders', authenticateToken, adminAuth, customizationController.getAllCustomizationOrders);
router.put('/admin/orders/:orderId/status', authenticateToken, adminAuth, customizationController.updateOrderStatus);

module.exports = router;