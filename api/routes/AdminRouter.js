const express = require('express');
const { adminLogin } = require('../controllers/AdminController');
const router = express.Router();

// Admin login route
router.post('/login', adminLogin);

module.exports = router; 