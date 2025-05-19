const authController = {};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const crypto = require('crypto');

const nodemailer = require("nodemailer");
const AppError = require("../utils/error");
const { payment, welcome } = require("../utils/constant");
const sendEmail = require("../utils/nodemailer");

const key = process.env.SECRET_KEY;
const signToken = (id) => {
  // if (!key) {
  //   throw new AppError('SECRET_KEY is not defined in the environment variables.', 500);    }
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
   // expiresIn: 2000,
  });
  return token;

};

signup = async (req, res, next) => {
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
      return res.send({message:"password is in correct"})
    }
    console.log("ddd")
    console.log(password,user, user.password)
    const matchPassword = await bcrypt.compare(password, user.password || '');

    if (!matchPassword) {
      const emailOptions = {
        email: user.email,
        subject: 'Your password reset token (valid for 10 minutes)',
        message: `froud access`,
      };
  
      await sendEmail(emailOptions);
      return res.status(400).send({message:"password is in correct"})
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
  //   const { email } = req.body;

  //   var user = await User.findOne({ email });

  //   if (!user) {
  //     return next(new AppError('No user found with that email', 404));
  //   }

  //   const resetToken = user.createPasswordResetToken();
  //  console.log("resetToken",resetToken);
   
  //   await user.save({ validateBeforeSave: false });


  //   const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
  //    console.log("resetURL",resetURL);
     
    // const emailOptions = {
    //   email: user.email,
    //   subject: '',
    //   message: ``,
    // };

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



  

module.exports = { signup, login,forgotPassword,resetPassword };
