const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const AppError = require("../utils/error");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: '24h' // Token expires in 24 hours
  });
  return token;
};

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide both email and password'
      });
    }

    // Find user and explicitly select admin role
    const admin = await User.findOne({ email }).select('+password +role');

    // Check if user exists and is an admin
    if (!admin || admin.role !== 'admin') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials or insufficient permissions'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log("isPasswordValid", isPasswordValid, password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = signToken(admin._id);

    // Remove password from response
    admin.password = undefined;

    // Send response
    res.status(200).json({
      status: 'success',
      token,
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role
        }
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return next(new AppError('Error during admin login', 500));
  }
};

module.exports = {
  adminLogin
}; 