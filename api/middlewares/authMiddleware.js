const jwt = require('jsonwebtoken');
const AppError = require("../utils/error"); // Custom error handling class
const User = require('../models/UserModel'); // User model for database interaction

 const protect = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
    // console.log("authHeader",authHeader);
     
    let token;
    

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1]; 
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded",decoded);


    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    req.user = currentUser;
    console.log("currentUser",currentUser);
    
    next();
  } catch (error) {
    return next(new AppError('Invalid token. Please log in again.', 401));
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }
    next();
  };
};

module.exports = { protect, restrictTo };
