const OTP = require('../models/OTPModel');

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Validate OTP format (6 digits)
const validateOTPFormat = (otp) => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

// Clean up expired OTPs
const cleanupExpiredOTPs = async () => {
  try {
    const result = await OTP.deleteMany({
      expiresAt: { $lt: new Date() }
    });
    console.log(`Cleaned up ${result.deletedCount} expired OTPs`);
    return result.deletedCount;
  } catch (error) {
    console.error('Error cleaning up expired OTPs:', error);
    return 0;
  }
};

// Check if user has too many recent OTP attempts
const checkOTPRateLimit = async (email, purpose = 'signup', maxAttempts = 5, timeWindow = 60 * 60 * 1000) => {
  try {
    const oneHourAgo = new Date(Date.now() - timeWindow);
    const recentAttempts = await OTP.countDocuments({
      email,
      purpose,
      createdAt: { $gte: oneHourAgo }
    });
    
    return recentAttempts < maxAttempts;
  } catch (error) {
    console.error('Error checking OTP rate limit:', error);
    return false;
  }
};

// Get remaining time for OTP expiry
const getOTPExpiryTime = (expiresAt) => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const remaining = expiry.getTime() - now.getTime();
  
  if (remaining <= 0) return 0;
  
  const minutes = Math.floor(remaining / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
  
  return { minutes, seconds, totalMs: remaining };
};

module.exports = {
  generateOTP,
  validateOTPFormat,
  cleanupExpiredOTPs,
  checkOTPRateLimit,
  getOTPExpiryTime
};
