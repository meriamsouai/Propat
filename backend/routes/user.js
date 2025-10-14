const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, userController.getProfile);

// Update user profile
router.put('/profile', authenticateToken, userController.updateProfile);

module.exports = router;