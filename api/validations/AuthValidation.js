// const User = require("../models/UserModel");

// const authValidation = {};

// // eslint-disable-next-line no-useless-escape
// const reg_exp_for_email =
//   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// authValidation.signUpValidation = async (req, res) => {
//   const { fastName, lastName, userName, email, phone,  password, cmPassword  } = req.body;

//   if (!fastName || !lastName || !userName || !email || !phone || !password || !cmPassword) {
//     return next(new AppError('Enter all the fields', 404)); return res.status(400).json({ message: "Not all field have been entered" });
//   }
//   if (!reg_exp_for_email.test(String(email).toLowerCase())) {
//     return   next(new AppError('please enter a valid email', 404));}
//   if (password.length < 6) {
//     return res.status(400).json({
//       message: "The password need to be at least 6 characters long.",
//     });
//   }
//   if (password !== cmPassword) {
//     return res
//       .status(400)
//       .json({ message: "Enter the save password twice for verification." });
//   }
//   const existingUser = await User.findOne({ email }, { email: 1 });
//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ message: "An account with this email already exists" });
//   }
// };

// authValidation.loginValidation = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Not all field have been entered" });
//   }
//   if (!reg_exp_for_email.test(String(email).toLowerCase())) {
//     return res
//       .status(400)
//       .json({ message: "please enter a valid email address" });
//   }
//   if (password.length < 6) {
//     return res.status(400).json({
//       message: "The password need to be at least 6 characters long.",
//     });
//   }
// };
// module.exports = authValidation;


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
