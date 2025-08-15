const express = require('express');
const { 
  login, 
  signup, 
  forgotPassword, 
  changePassword, 
  getFrequentBuyers, 
  getAllUsers, 
  getUser,
  generateSignupOTP,
  verifySignupOTP,
  resendSignupOTP,
  deleteAccount
} = require('../controllers/AuthController'); 
const { adminLogin } = require('../controllers/AdminController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// OTP-based signup routes
router.post('/generate-signup-otp', generateSignupOTP);
router.post('/verify-signup-otp', verifySignupOTP);
router.post('/resend-signup-otp', resendSignupOTP);

// Legacy signup route (keeping for backward compatibility)
router.post('/signup', signup); 
router.post('/login', login);   
router.post('/adminLogin', adminLogin);   
router.post('/forgotPassword', forgotPassword); 
router.post('/resetPassword/:token', resetPassword); 
router.post('/updateUserInfo',protect, updateUserInfo); 
router.post('/makeAdmin',protect, makeAdmin); 
router.post('/changePassword',protect, changePassword); 
router.post('/buyers', getFrequentBuyers); 
router.get('/getAllUsers', getAllUsers); 
router.post('/getUser', getUser); 
router.post('/deleteAccount', deleteAccount);








module.exports = router;

