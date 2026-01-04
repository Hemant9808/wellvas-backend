const express = require('express');
const router = express.Router();
const couponController = require('../controllers/CouponController');
const { protect } = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Public/User routes
router.post('/validate', couponController.validateCoupon);

// Admin routes (protected + admin only)
router.use(protect, adminMiddleware);

router.post('/', couponController.createCoupon);
router.get('/', couponController.getAllCoupons);
router.get('/stats', couponController.getCouponStats);
router.get('/:id', couponController.getCouponById);
router.put('/:id', couponController.updateCoupon);
router.delete('/:id', couponController.deleteCoupon);
router.patch('/:id/toggle-status', couponController.toggleCouponStatus);

module.exports = router;
