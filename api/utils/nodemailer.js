// utils/email.js
const nodemailer = require('nodemailer');
const { emailTemp,temp2,temp4,old,home,home2,home3 } = require('./abc');
const { template, template2, emailVerificationTemplate, lotteryPurchaseTemplate, winnerAnnouncementTemplate, newsletterSubscriptionTemplate, passwordResetTemplate, lotteryPurchaseTemplate1, temp11, temp12 } = require('./constant');

const sendEmail = async (options) => {
  // 1. Create a transporter object for sending emails
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // or any other email service provider
    auth: {
        // user: "hemant@adirayglobal.com",
        // pass: "ogmnatcklinhjoyl",
        user: "kumarhemantk64@gmail.com",
        pass: "sikhwhemlxlexvkw"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // 2. Define the email options
  const mailOptions = {
    from: "hemant@adirayglobal.com",
    to: options.email || "hemant27134@gmail.com",
    subject: options.subject || "Wellvas Notification",
    html: options.html || options.message || temp12
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

// Function to send OTP email
const sendOTPEmail = async (email, otp, purpose = 'signup') => {
  const subject = purpose === 'signup' 
    ? 'Verify Your Email - Wellvas Signup' 
    : 'Password Reset OTP - Wellvas';
    
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #333; margin: 0;">Wellvas</h2>
          <p style="color: #666; margin: 10px 0;">${purpose === 'signup' ? 'Complete Your Registration' : 'Reset Your Password'}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <h3 style="color: #333; margin: 0 0 15px 0;">Your Verification Code</h3>
          <div style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; padding: 15px; background-color: #ffffff; border: 2px dashed #007bff; border-radius: 8px; display: inline-block;">
            ${otp}
          </div>
        </div>
        
        <p style="color: #666; line-height: 1.6; margin: 20px 0;">
          ${purpose === 'signup' 
            ? 'Please enter this verification code to complete your registration. This code will expire in 10 minutes.'
            : 'Please enter this verification code to reset your password. This code will expire in 10 minutes.'
          }
        </p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 14px; margin: 0;">
            If you didn't request this code, please ignore this email.
          </p>
        </div>
      </div>
    </div>
  `;

  await sendEmail({
    email,
    subject,
    html
  });
};

module.exports = { sendEmail, sendOTPEmail };
