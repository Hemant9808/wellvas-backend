const Reward = require('../models/RewardModel');
const User = require('../models/UserModel');

const rewardController = {};

// Maximum number of claims allowed per user
const MAX_CLAIMS_PER_USER = 1;

// Generate a unique reward code
const generateRewardCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Generate a random cashback amount between 2 and 12
const generateCashbackAmount = () => {
  return Math.floor(Math.random() * (12 - 2 + 1)) + 2;
};

/**
 * POST /rewards/generate
 * Generate a new reward for the authenticated user
 */
rewardController.generateReward = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Check if user has reached the claim limit
    const claimedRewardsCount = await Reward.countUserClaims(userId);

    if (claimedRewardsCount >= MAX_CLAIMS_PER_USER) {
      return res.status(403).json({
        success: false,
        message: `You have reached the maximum limit of ${MAX_CLAIMS_PER_USER} rewards!`,
        claimedCount: claimedRewardsCount,
        maxClaims: MAX_CLAIMS_PER_USER
      });
    }

    // Generate unique reward code (retry if collision occurs)
    let rewardCode;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      rewardCode = generateRewardCode();
      const existing = await Reward.findOne({ rewardCode });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return res.status(500).json({
        success: false,
        message: 'Unable to generate a unique reward code. Please try again.'
      });
    }

    // Generate cashback amount
    const cashbackAmount = generateCashbackAmount();

    // Set expiration time (24 hours from now)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Create the reward
    const reward = await Reward.create({
      userId,
      rewardCode,
      cashbackAmount,
      expiresAt
    });

    // Return reward details
    return res.status(201).json({
      success: true,
      message: 'Reward generated successfully!',
      reward: {
        id: reward._id,
        rewardCode: reward.rewardCode,
        cashbackAmount: reward.cashbackAmount,
        status: reward.status,
        expiresAt: reward.expiresAt
      },
      remainingClaims: MAX_CLAIMS_PER_USER - claimedRewardsCount
    });

  } catch (error) {
    console.error('Generate reward error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate reward',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * POST /rewards/:rewardId/claim
 * Claim a generated reward
 */
rewardController.claimReward = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { rewardId } = req.params;

    // Find the reward
    const reward = await Reward.findById(rewardId);

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }

    // Verify ownership
    if (reward.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'This reward does not belong to you'
      });
    }

    // Check if already claimed
    if (reward.status === 'claimed') {
      return res.status(400).json({
        success: false,
        message: 'This reward has already been claimed'
      });
    }

    // Check if expired
    if (reward.isExpired() || reward.status === 'expired') {
      reward.status = 'expired';
      await reward.save();
      return res.status(400).json({
        success: false,
        message: 'This reward has expired'
      });
    }

    // Mark as claimed
    reward.status = 'claimed';
    reward.claimedAt = new Date();
    await reward.save();

    return res.status(200).json({
      success: true,
      message: 'Reward claimed successfully!',
      reward: {
        id: reward._id,
        rewardCode: reward.rewardCode,
        cashbackAmount: reward.cashbackAmount,
        status: reward.status,
        claimedAt: reward.claimedAt
      }
    });

  } catch (error) {
    console.error('Claim reward error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to claim reward',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * GET /rewards/my-rewards
 * Get all rewards for the authenticated user
 */
rewardController.getUserRewards = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const rewards = await Reward.find({ userId })
      .sort({ createdAt: -1 })
      .select('rewardCode cashbackAmount status claimedAt expiresAt createdAt');

    const claimedCount = await Reward.countUserClaims(userId);

    return res.status(200).json({
      success: true,
      rewards,
      claimedCount,
      maxClaims: MAX_CLAIMS_PER_USER,
      remainingClaims: Math.max(0, MAX_CLAIMS_PER_USER - claimedCount)
    });

  } catch (error) {
    console.error('Get user rewards error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch rewards',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


/**
 * GET /rewards/admin/all
 * Get all rewards for admin (requires admin authentication)
 */
rewardController.getAllRewards = async (req, res, next) => {
  try {
    const { status } = req.query;

    // Build query filter
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Fetch rewards with user details
    const rewards = await Reward.find(filter)
      .populate('userId', 'firstName lastName email phone')
      .sort({ createdAt: -1 })
      .limit(500); // Limit to recent 500 rewards

    return res.status(200).json({
      success: true,
      rewards,
      count: rewards.length
    });

  } catch (error) {
    console.error('Get all rewards error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch rewards',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * GET /rewards/admin/stats
 * Get reward statistics for admin dashboard
 */
rewardController.getRewardStats = async (req, res, next) => {
  try {
    const totalRewards = await Reward.countDocuments();
    const claimedRewards = await Reward.countDocuments({ status: 'claimed' });
    const pendingRewards = await Reward.countDocuments({ status: 'pending' });
    const expiredRewards = await Reward.countDocuments({ status: 'expired' });

    // Calculate total cashback from claimed rewards
    const cashbackResult = await Reward.aggregate([
      { $match: { status: 'claimed' } },
      { $group: { _id: null, total: { $sum: '$cashbackAmount' } } }
    ]);

    const totalCashback = cashbackResult.length > 0 ? cashbackResult[0].total : 0;

    return res.status(200).json({
      success: true,
      stats: {
        totalRewards,
        claimedRewards,
        pendingRewards,
        expiredRewards,
        totalCashback
      }
    });

  } catch (error) {
    console.error('Get reward stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  generateReward: rewardController.generateReward,
  claimReward: rewardController.claimReward,
  getUserRewards: rewardController.getUserRewards,
  getAllRewards: rewardController.getAllRewards,
  getRewardStats: rewardController.getRewardStats
};
