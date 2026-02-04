const express = require('express');
const {
  generateReward,
  claimReward,
  getUserRewards,
  getAllRewards,
  getRewardStats
} = require('../controllers/RewardController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// All reward routes require authentication
router.use(protect);

// User routes
router.post('/generate', generateReward);
router.post('/:rewardId/claim', claimReward);
router.get('/my-rewards', getUserRewards);

// Admin routes (add admin middleware if you have one)
router.get('/admin/all', getAllRewards);
router.get('/admin/stats', getRewardStats);

module.exports = router;
