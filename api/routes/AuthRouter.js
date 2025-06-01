const express = require('express');
const { login, signup, forgotPassword } = require('../controllers/AuthController'); 
const { adminLogin } = require('../controllers/AdminController');

const router = express.Router();

router.post('/signup', signup); 
router.post('/login', login);   
router.post('/adminLogin', adminLogin);   
router.post('/forgotPassword', forgotPassword); 
router.post('/resetPassword/:token', resetPassword); 

module.exports = router;

