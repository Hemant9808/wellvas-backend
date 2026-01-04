const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');
const { protect } = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Public routes (no authentication required)
router.get('/product/:productId', reviewController.getProductReviews);

// Protected routes (authentication required)
router.use(protect); // All routes below require authentication

// User routes
router.post('/', reviewController.createReview);
router.get('/user/my-reviews', reviewController.getUserReviews);
router.patch('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);
router.post('/:id/vote', reviewController.voteReview);

// Admin routes
router.get('/admin/all', adminMiddleware, reviewController.getAllReviews);
router.patch('/admin/:id/approve', adminMiddleware, reviewController.approveReview);
router.patch('/admin/:id/reject', adminMiddleware, reviewController.rejectReview);

module.exports = router;
