const express = require('express');
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Admin routes
router.get('/users', authenticateToken, adminAuth, adminController.getAllUsers);

module.exports = router;