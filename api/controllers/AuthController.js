const authController = {};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const OTP = require("../models/OTPModel");
const crypto = require('crypto');
const Order = require('../models/OrderModel');
const nodemailer = require("nodemailer");
const AppError = require("../utils/error");
const { payment, welcome } = require("../utils/constant");
const { sendEmail, sendOTPEmail } = require("../utils/nodemailer");
const { generateOTP, validateOTPFormat, checkOTPRateLimit } = require("../utils/otpUtils");

const key = process.env.SECRET_KEY;
const signToken = (id) => {
  // if (!key) {
  //   throw new AppError('SECRET_KEY is not defined in the environment variables.', 500);    }
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    // expiresIn: 2000,
  });
  return token;

};

// Generate OTP for signup
const generateSignupOTP = async (req, res, next) => {
  try {
    const { email, firstName, lastName, userName, phone, password } = req.body;

    if (!email || !firstName || !lastName || !userName || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if used with email verified already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {

      if (existingUser.isEmailVerified) {
        // const updatedUser = await User.findOneAndUpdate({ email },{ isEmailVerified:false, emailVerifiedAt:null },{new:true});
        return res.status(400).json({ message: "User with this email already exists", existingUser });
      }
      // return res.status(400).json({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    if (!existingUser) {
      const newUser = new User({
        email,
        firstName,
        lastName,
        userName,
        phone,
        password: hashPassword,
      })
      await newUser.save();
    }

    // Check rate limit (max 5 attempts per hour)
    const canSendOTP = await checkOTPRateLimit(email, 'signup', 5, 60 * 60 * 1000);
    if (!canSendOTP) {
      return res.status(429).json({
        message: "Too many OTP attempts. Please wait for 1 hour before requesting another OTP."
      });
    }

    console.log("OTP before generating");

    // Generate 6-digit OTP using utility function
    const otp = generateOTP();
    console.log("OTP after generating", otp);

    // Set expiration time (10 minutes from now)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP to database
    await OTP.create({
      email,
      otp,
      expiresAt,
      purpose: 'signup'
    });

    console.log("otp saved to database");

    // Store user data temporarily (you could use Redis for better performance)


    // Send OTP email
    await sendOTPEmail(email, otp, 'signup');
    console.log("OTP sent to your email. Please check and verify.");

    res.status(200).json({
      message: "OTP sent to your email. Please check and verify.",
      email: email
    });

  } catch (error) {
    console.log("Generate OTP error:", error);
    next(error);
  }
};

// Verify OTP and complete signup
const verifySignupOTP = async (req, res, next) => {
  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(402).json({ message: "enter all the fields" });
    }

    const existingOTP = await OTP.findOne({ email, otp });

    if (!existingOTP) {
      return res.status(402).json({ message: "invalid otp" });
    }

    const checkOTP = await OTP.findOne({ email, otp, expiresAt: { $gt: Date.now() } });
    if (!checkOTP) {
      return res.status(402).json({ message: "otp expired" });
    }

    const user = await User.findOneAndUpdate({ email }, { isEmailVerified: true, emailVerifiedAt: new Date() }, { new: true });

    if (!user) {
      return res.status(402).json({ message: "user not found" });
    }

    return res.status(200).send({ success: true, message: "otp verified successfully", user: user, token: signToken(user.id) })


  } catch (error) {
    console.log("Verify OTP error:", error);
    next(error);
  }
};

// Legacy signup function (keeping for backward compatibility)
const signup = async (req, res, next) => {
  console.log("----------------------request");
  console.log(req.body.email);

  try {
    const { firstName, lastName, userName, email, phone, password } = req.body;
    console.log("firstName", firstName);

    if (!firstName || !lastName || !userName || !email || !phone || !password) {
      return res.status(402).json({ message: "enter all the fields" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      phone,
      password: hashPassword,
    });

    const saveUser = await newUser.save();

    saveUser.password = undefined;
    const token = signToken(saveUser.id);
    return res.status(200).send({
      token,
      user: saveUser
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(402).send({ message: "all fields are required" });
    }

    const user = await User.findOne({ email }).select("username email password firstName lastName phone role");
    if (!user) {
      return res.status(400).send({ status: 400, message: "user not found" })
    }

    console.log("ddd")
    console.log(password, user, user.password)
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      // const emailOptions = {
      //   email: user.email,
      //   subject: 'Your password reset token (valid for 10 minutes)',
      //   message: `froud access`,
      // };

      // await sendEmail(emailOptions);
      return res.status(400).send({ message: "password is incorrect" })
    }
    console.log('still running')
    const token = signToken(user.id);

    console.log(token);
    user.password = undefined;

    return res.status(200).send({
      token,
      user,
      isAdmin: user.role === 'admin'
    });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
};


const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError('No user found with that email', 404));
    }

    const resetToken = user.createPasswordResetToken();
    console.log("resetToken", resetToken);
    console.log("💾 Token being saved to DB:", user.passwordResetToken);
    console.log("Expires at:", user.passwordResetExpires);

    await user.save({ validateBeforeSave: false });

    // Create reset URL - Points to frontend with token as query parameter
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetURL = `${frontendURL}/reset-password?token=${resetToken}`;
    console.log("resetURL", resetURL);

    const emailOptions = {
      email: user.email,
      subject: 'Password Reset Request - Wellvas',
      message: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Password Reset Request</h2>
            <p style="color: #555; line-height: 1.6;">Hi ${user.firstName},</p>
            <p style="color: #555; line-height: 1.6;">We received a request to reset your password for your Wellvas account.</p>
            <p style="color: #555; line-height: 1.6;">Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetURL}" style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            </div>
            <p style="color: #555; line-height: 1.6; font-size: 14px;">Or copy and paste this link into your browser:</p>
            <p style="color: #3498db; word-break: break-all; font-size: 12px;">${resetURL}</p>
            <p style="color: #e74c3c; margin-top: 20px; font-size: 14px;">⚠️ This link will expire in 10 minutes.</p>
            <p style="color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
              If you didn't request a password reset, please ignore this email or contact support if you have concerns.
            </p>
            <p style="color: #555; margin-top: 20px;">Best regards,<br><strong>Wellvas Team</strong></p>
          </div>
        </div>
      `,
    };

    await sendEmail(emailOptions);

    res.status(200).send({
      message: 'Password reset link sent to your email!',
      success: true
    });
  } catch (error) {
    // Cleanup on error
    if (user) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
    }
    console.log("Error in sending password reset email:", error);
    return next(new AppError('Error sending the email. Try again later!', 500));
  }
};



const resetPassword = async (req, res, next) => {
  try {
    console.log('🔍 Reset Password Request:');
    console.log('Received token from URL:', req.params.token);

    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    console.log('Hashed token:', hashedToken);
    console.log('Current time:', Date.now());

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    console.log('User found:', user ? `Yes (${user.email})` : 'No');

    if (user) {
      console.log('User reset token:', user.passwordResetToken);
      console.log('Token expires:', user.passwordResetExpires);
      console.log('Token expired?', user.passwordResetExpires < Date.now());
    }

    if (!user) {
      console.log('❌ Token validation failed!');
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const token = signToken(user.id);
    res.status(200).send({ token, message: 'Password reset successful!' });
  } catch (error) {
    console.log("Error", error);

    return next(new AppError('Something went wrong', 500));
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, userName, email, phone } = req.body;
    console.log("updateUserInfo", req.body);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, userName, email, phone },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({ user: updatedUser, message: 'User info updated successfully' });
  } catch (error) {
    console.log("Update user error", error);
    next(new AppError('Unable to update user info', 500));
  }
};


const makeAdmin = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const targetUserEmail = req.body.email;

    console.log("currentUserId", currentUserId);
    // console.log("targetUserId",targetUserId);


    const currentUser = await User.findOne({ _id: currentUserId }).select('role _id');

    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).send({ message: 'Access denied. Only admins can perform this action.' });
    }

    console.log("currentUser", currentUser._id);

    const updatedUser = await User.findOneAndUpdate(
      { email: targetUserEmail },
      { role: 'admin' },
      { new: true }
    ).select('-password');

    console.log("updatedUser", updatedUser);

    if (!updatedUser) {
      return res.status(404).send({ message: 'Target user not found' });
    }

    res.status(200).send({ message: 'User promoted to admin', user: updatedUser });
  } catch (error) {
    console.log("Make admin error", error);
    next(new AppError('Unable to make user admin', 500));
  }
};


const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required.' });
    }

    // Optional: Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    // Get user + password (since select:false in schema)
    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    // Hash and save new password
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt); // ✅ Securely hash
    await user.save();

    // Invalidate old tokens (optional, for security)
    // Example: await Token.deleteMany({ userId });

    return res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error('Change password error:', err);
    next(new AppError('Error changing password', 500));
  }
};


// GET /api/user/getUser
getUser = async (req, res, next) => {
  try {
    const { userId, email } = req.body;

    if (!userId && !email) {
      return res.status(400).json({ message: 'Please provide userId or email' });
    }

    const user = await User.findOne(
      userId ? { _id: userId } : { email }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    next(new AppError('Unable to fetch user info', 500));
  }
};


// GET /api/user/allUsers?page=1&limit=10
getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    console.log("page", page, limit, skip);

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-password');

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      total: totalUsers,
      page,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (error) {
    console.error('Get all users error:', error);
    next(new AppError('Unable to fetch users', 500));
  }
};



// GET /api/user/frequent-buyers?page=1&limit=10
// Adjust path accordingly



// GET /api/user/frequent-buyers?page=1&limit=10
getFrequentBuyers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const buyers = await Order.aggregate([
      {
        $group: {
          _id: '$user',
          orderCount: { $sum: 1 }
        }
      },
      {
        $sort: { orderCount: -1 }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          orderCount: 1,
          user: {
            firstName: '$user.firstName',
            lastName: '$user.lastName',
            email: '$user.email',
            phone: '$user.phone',
            createdAt: '$user.createdAt'
          }
        }
      }
    ]);

    res.status(200).json({
      page,
      limit,
      buyers
    });
  } catch (err) {
    console.error('Frequent buyers error:', err);
    res.status(500).json({ message: 'Unable to fetch frequent buyers' });
  }
};


// Resend OTP function
const resendSignupOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser.isEmailVerified) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Check rate limit (max 5 attempts per hour)
    const canSendOTP = await checkOTPRateLimit(email, 'signup', 5, 60 * 60 * 1000);
    if (!canSendOTP) {
      return res.status(429).json({
        message: "Too many OTP attempts. Please wait for 1 hour before requesting another OTP."
      });
    }

    // Delete any existing OTP for this email
    await OTP.deleteMany({ email, purpose: 'signup' });

    // Generate new 6-digit OTP using utility function
    const otp = generateOTP();

    // Set expiration time (10 minutes from now)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save new OTP to database
    await OTP.create({
      email,
      otp,
      expiresAt,
      purpose: 'signup'
    });

    // Send new OTP email
    await sendOTPEmail(email, otp, 'signup');

    res.status(200).json({
      message: "New OTP sent to your email. Please check and verify.",
      email: email
    });

  } catch (error) {
    console.log("Resend OTP error:", error);
    next(error);
  }
};


//api to delete acountfor user to have option to delete account

const deleteAccount = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log("Delete account error:", error);
    next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user || user.isEmailVerified) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    return res.status(200).json({ message: "User found", success: true, user: user, token: signToken(user.id) });
  } catch (error) {
    // console.log("Get user details error:", error);
    next(error);
  }
}

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updateUserInfo,
  makeAdmin,
  changePassword,
  getFrequentBuyers,
  getUser,
  getAllUsers,
  generateSignupOTP,
  verifySignupOTP,
  resendSignupOTP,
  deleteAccount,
  getUserDetails
};
