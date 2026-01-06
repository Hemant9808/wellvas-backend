// I am trying to Push

const User = require("../models/UserModel");
const AppError = require("../utils/error");


const authValidation = {};

// eslint-disable-next-line no-useless-escape
const reg_exp_for_email =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

authValidation.signUpValidation = async (req, res, next) => {
  const { fastName, lastName, userName, email, phone, password } = req.body;

  if (!fastName || !lastName || !userName || !email || !phone || !password) {
    return next(new AppError('Enter all the fields', 400));
  }

  if (!reg_exp_for_email.test(String(email).toLowerCase())) {
    return next(new AppError('Please enter a valid email address', 400));
  }

  if (password.length < 6) {
    return next(new AppError('The password needs to be at least 6 characters long.', 400));
  }

  // if (password !== cmPassword) {
  //   return next(new AppError('Enter the same password twice for verification.', 400));
  // }

  const existingUser = await User.findOne({ email }, { email: 1 });
  if (existingUser) {
    return next(new AppError('An account with this email already exists', 400));
  }
  console.log("last step");

  next();
};

authValidation.loginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Not all fields have been entered', 400));
  }

  if (!reg_exp_for_email.test(String(email).toLowerCase())) {
    return next(new AppError('Please enter a valid email address', 400));
  }

  if (password.length < 6) {
    return next(new AppError('The password needs to be at least 6 characters long.', 400));
  }

  next();
};

module.exports = authValidation;
