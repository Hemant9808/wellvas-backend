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
    const matchPassword = await bcrypt.compare(password, user.password);

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

// POST /auth/changePassword
// const changePassword = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword ) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }



//     const user = await User.findById(userId).select('+password');
//     console.log("user",user);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     console.log("currentPassword",user.password);

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     console.log("currentPassword",currentPassword,user.password);
//     console.log("isMatch",isMatch);

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Current password is incorrect.' });
//     }

//     user.password = newPassword;
//     await user.save();

//     res.status(200).json({ message: 'Password changed successfully.' });
//   } catch (err) {
//     console.error('Change password error:', err);
//     next(new AppError('Error changing password', 500));
//   }
// };
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



  

module.exports = { signup, login,forgotPassword,resetPassword,changePassword };
