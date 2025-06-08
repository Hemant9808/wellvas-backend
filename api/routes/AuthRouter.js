const express = require('express');
const { login, signup, forgotPassword, changePassword, getFrequentBuyers, getAllUsers, getUser } = require('../controllers/AuthController'); 
const { adminLogin } = require('../controllers/AdminController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

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





module.exports = router;

