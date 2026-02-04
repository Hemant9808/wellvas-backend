const mongoose = require('mongoose');
const { Schema } = mongoose;

const rewardSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    rewardCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true
    },
    cashbackAmount: {
      type: Number,
      required: true,
      min: 2,
      max: 12
    },
    status: {
      type: String,
      enum: ['pending', 'claimed', 'expired'],
      default: 'pending'
    },
    claimedAt: {
      type: Date,
      default: null
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

// Index for efficient queries
rewardSchema.index({ userId: 1, status: 1 });
rewardSchema.index({ expiresAt: 1 });

// Method to check if reward has expired
rewardSchema.methods.isExpired = function () {
  return this.expiresAt < new Date();
};

// Static method to count user's claimed rewards
rewardSchema.statics.countUserClaims = async function (userId) {
  return await this.countDocuments({
    userId,
    status: 'claimed'
  });
};

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;
