

const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: true,
      
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, 
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user', 
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerifiedAt: Date,
  },
  { timestamps: true },
);



userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});


userSchema.methods.isPasswordChanged = function (JWTCreatedTime) {
  if (this.passwordChangedAt) {
    const passwordChangedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTCreatedTime < passwordChangedAt;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; 

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

