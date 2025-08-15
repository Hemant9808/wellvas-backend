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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
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
    console.log("OTP after generating",otp);
    
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
    req.session = req.session || {};
    req.session.tempUserData = {
      firstName,
      lastName,
      userName,
      email,
      phone,
      password
    };

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
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Validate OTP format
    if (!validateOTPFormat(otp)) {
      return res.status(400).json({ message: "Invalid OTP format. Please enter a 6-digit code." });
    }

    // Find the OTP record
    const otpRecord = await OTP.findOne({
      email,
      otp,
      purpose: 'signup',
      isUsed: false,
      expiresAt: { $gt: Date.now() }
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark OTP as used
    otpRecord.isUsed = true;
    await otpRecord.save();

    // Get user data from session (in production, use Redis or similar)
    const userData = req.session?.tempUserData;
    if (!userData || userData.email !== email) {
      return res.status(400).json({ message: "User data not found. Please try signing up again." });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userData.password, salt);

    // Create new user
    const newUser = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.userName,
      email: userData.email,
      phone: userData.phone,
      password: hashPassword,
      isEmailVerified: true,
      emailVerifiedAt: new Date()
    });

    const saveUser = await newUser.save();
    
    // Clear session data
    if (req.session) {
      delete req.session.tempUserData;
    }
    
    saveUser.password = undefined;
    const token = signToken(saveUser.id);
    
    return res.status(200).send({
      message: "Account created successfully!",
      token,
      user: saveUser
    });

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
    console.log("firstName",firstName);
    
    if(!firstName || !lastName|| !userName ||  !email || !phone || !password){
      return res.status(402).json({message:"enter all the fields"});
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
      user:saveUser
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    console.log( email, password);

    if (!email || !password) {
      return res.status(402).send({ message: "all fields are required"});
    }

    const user = await User.findOne({ email }).select("username email password firstName lastName phone role");
    if (!user) {
      return res.status(400).send({status:400,message:"user not found"})
    }

    console.log("ddd")
    console.log(password,user, user.password)
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      // const emailOptions = {
      //   email: user.email,
      //   subject: 'Your password reset token (valid for 10 minutes)',
      //   message: `froud access`,
      // };
  
      // await sendEmail(emailOptions);
      return res.status(400).send({message:"password is incorrect"})
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


forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    var user = await User.findOne({ email });

    if (!user) {
      return next(new AppError('No user found with that email', 404));
    }

    const resetToken = user.createPasswordResetToken();
   console.log("resetToken",resetToken);
   
    await user.save({ validateBeforeSave: false });


    const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
     console.log("resetURL",resetURL);
     
    const emailOptions = {
      email: user.email,
      subject: '',
      message: ``,
    };

    await sendEmail();

    res.status(200).send({ message: 'Token sent to email!' });
  } catch (error) {
    // user.passwordResetToken = undefined;
    // user.passwordResetExpires = undefined;
    // await user.save({ validateBeforeSave: false });
 console.log("error in email sendign",error)
    return next(new AppError('Error sending the email. Try again later!', 500));
  }
};



resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const token = signToken(user.id);
    res.status(200).send({ token, message: 'Password reset successful!' });
  } catch (error) {
    console.log("Error",error);
    
    return next(new AppError('Something went wrong', 500));
  }
};

updateUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, userName, email, phone } = req.body;
    console.log("updateUserInfo",req.body);

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


makeAdmin = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const targetUserEmail = req.body.email;

    console.log("currentUserId",currentUserId);
    // console.log("targetUserId",targetUserId);


    const currentUser = await User.findOne({_id: currentUserId}).select('role _id');
    
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).send({ message: 'Access denied. Only admins can perform this action.' });
    }

    console.log("currentUser",currentUser._id);

   const updatedUser = await User.findOneAndUpdate(
      { email: targetUserEmail },
      { role: 'admin' },
      { new: true }
    ).select('-password');

    console.log("updatedUser",updatedUser);

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

    console.log("page",page,limit,skip);

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
    if (existingUser) {
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

module.exports = { 
  signup, 
  login, 
  forgotPassword, 
  resetPassword, 
  changePassword, 
  getFrequentBuyers, 
  getUser, 
  getAllUsers,
  generateSignupOTP,
  verifySignupOTP,
  resendSignupOTP,
  deleteAccount
};
