const mongoose = require('mongoose');
const { Schema } = mongoose;

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  purpose: {
    type: String,
    enum: ['signup', 'password-reset'],
    default: 'signup',
  }
}, { timestamps: true });

// Index for faster queries and automatic cleanup
otpSchema.index({ email: 1, purpose: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
