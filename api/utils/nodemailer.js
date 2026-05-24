// utils/email.js
const nodemailer = require('nodemailer');
const { emailTemp, temp2, temp4, old, home, home2, home3 } = require('./abc');
const { template, template2, emailVerificationTemplate, lotteryPurchaseTemplate, winnerAnnouncementTemplate, newsletterSubscriptionTemplate, passwordResetTemplate, lotteryPurchaseTemplate1, temp11, temp12 } = require('./constant');

const sendEmail = async (options) => {
  // 1. Create a transporter object for sending emails
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // or any other email service provider
    auth: {
      user: "ayucanhealthcare@gmail.com",
      pass: "uzxeaehplrigbcef",
      // user: "kumarhemantk64@gmail.com",
      // pass: "sikhwhemlxlexvkw"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // 2. Define the email options
  const mailOptions = {
    from: "hemant@adirayglobal.com",
    to: options.email || "hemant27134@gmail.com",
    subject: options.subject || "Ayucan Notification",
    html: options.html || options.message || temp12
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

// Function to send OTP email
const sendOTPEmail = async (email, otp, purpose = 'signup') => {
  const subject = purpose === 'signup'
    ? 'Verify Your Email - Ayucan Signup'
    : 'Password Reset OTP - Ayucan';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FDFBF7; padding: 40px 20px; text-align: center; margin: 0; min-height: 100%;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #F2ECE7; box-shadow: 0 10px 30px rgba(42,59,40,0.05); text-align: left; margin: 0 auto;">
        <!-- Header -->
        <tr>
          <td style="background-color: #2A3B28; padding: 40px; text-align: center; border-bottom: 4px solid #C17C3A;">
            <h1 style="color: #FDFBF7; font-family: 'Georgia', serif; font-size: 28px; font-weight: bold; letter-spacing: 4px; margin: 0; text-transform: uppercase;">AYUCAN</h1>
            <p style="color: #C17C3A; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 10px 0 0 0;">Premium Ayurvedic Wellness</p>
          </td>
        </tr>
        
        <!-- Content -->
        <tr>
          <td style="padding: 40px 30px; background-color: #ffffff;">
            <h2 style="color: #2A3B28; font-family: 'Georgia', serif; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; text-align: center;">
              ${purpose === 'signup' ? 'Verify Your Account' : 'Reset Your Password'}
            </h2>
            
            <p style="color: #715036; font-size: 14px; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
              ${purpose === 'signup' 
                ? 'Welcome to the wellness family! Please enter the secure verification code below to complete your Ayucan registration. This code is active for 10 minutes.'
                : 'We received a request to reset your account password. Please enter the secure verification code below. This code is active for 10 minutes.'
              }
            </p>
            
            <!-- OTP Container -->
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #FDFBF7; border: 2px dashed #C17C3A; border-radius: 16px; padding: 20px 40px; display: inline-block;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: bold; letter-spacing: 8px; color: #2A3B28;">${otp}</span>
              </div>
            </div>
            
            <p style="color: #715036; font-size: 12px; line-height: 1.6; margin: 30px 0 0 0; text-align: center; font-style: italic;">
              If you did not request this verification code, you can safely ignore this email. Your account security is preserved.
            </p>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="background-color: #2A3B28; padding: 30px; text-align: center; border-top: 1px solid #F2ECE7;">
            <p style="color: #A0B09E; font-size: 11px; line-height: 1.6; margin: 0;">
              © ${new Date().getFullYear()} Ayucan Healthcare Private Limited. All rights reserved.<br />
              Delivering lab-tested, pure, next-generation organic wellness.
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;

  await sendEmail({
    email,
    subject,
    html
  });
};

// Function to send order confirmation email
const sendOrderConfirmationEmail = async (userEmail, userName, orderDetails) => {
  const subject = 'Order Confirmation - Ayucan';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FDFBF7; padding: 40px 20px; margin: 0; min-height: 100%;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #F2ECE7; box-shadow: 0 10px 30px rgba(42,59,40,0.05); text-align: left; margin: 0 auto;">
        <!-- Header -->
        <tr>
          <td style="background-color: #2A3B28; padding: 40px; text-align: center; border-bottom: 4px solid #C17C3A;">
            <h1 style="color: #FDFBF7; font-family: 'Georgia', serif; font-size: 28px; font-weight: bold; letter-spacing: 4px; margin: 0; text-transform: uppercase;">AYUCAN</h1>
            <p style="color: #C17C3A; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 10px 0 0 0;">Premium Ayurvedic Wellness</p>
          </td>
        </tr>
        
        <!-- Content Body -->
        <tr>
          <td style="padding: 40px 30px; background-color: #ffffff;">
            <!-- Welcome Banner -->
            <div style="background-color: #FDFBF7; border-left: 4px solid #C17C3A; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
              <h2 style="color: #2A3B28; font-family: 'Georgia', serif; font-size: 18px; font-weight: bold; margin: 0 0 10px 0;">✅ Order Successfully Placed!</h2>
              <p style="color: #2A3B28; font-size: 14px; margin: 0; font-weight: 600;">Dear ${userName || 'Wellness Seeker'},</p>
              <p style="color: #715036; font-size: 13px; line-height: 1.6; margin: 8px 0 0 0;">
                Thank you for choosing Ayucan. We have successfully received your payment, and your journey to premium Ayurvedic wellness has officially begun!
              </p>
            </div>

            <!-- Billing Details Table -->
            <h3 style="color: #2A3B28; font-family: 'Georgia', serif; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 1px solid #F2ECE7; padding-bottom: 10px;">Order Invoice</h3>
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.8;">
              <tr style="background-color: #FDFBF7;">
                <td style="padding: 10px; color: #715036; font-weight: bold; border-bottom: 1px solid #F2ECE7; width: 40%;">Order ID</td>
                <td style="padding: 10px; color: #2A3B28; font-weight: bold; border-bottom: 1px solid #F2ECE7; word-break: break-all;">${orderDetails.razorpay_order_id || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #715036; font-weight: bold; border-bottom: 1px solid #F2ECE7;">Payment ID</td>
                <td style="padding: 10px; color: #2A3B28; border-bottom: 1px solid #F2ECE7; word-break: break-all;">${orderDetails.razorpay_payment_id || 'N/A'}</td>
              </tr>
              <tr style="background-color: #FDFBF7;">
                <td style="padding: 10px; color: #715036; font-weight: bold; border-bottom: 1px solid #F2ECE7;">Total Price</td>
                <td style="padding: 10px; color: #C17C3A; font-weight: bold; border-bottom: 1px solid #F2ECE7; font-size: 15px;">₹${orderDetails.totalPrice}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #715036; font-weight: bold; border-bottom: 1px solid #F2ECE7;">Payment Method</td>
                <td style="padding: 10px; color: #2A3B28; border-bottom: 1px solid #F2ECE7; text-transform: uppercase; font-weight: 500;">${orderDetails.paymentMethod || 'Prepaid'}</td>
              </tr>
              <tr style="background-color: #FDFBF7;">
                <td style="padding: 10px; color: #715036; font-weight: bold; border-bottom: 1px solid #F2ECE7;">Date Ordered</td>
                <td style="padding: 10px; color: #2A3B28; border-bottom: 1px solid #F2ECE7;">${new Date(orderDetails.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
            </table>

            <!-- Next Steps -->
            <div style="background-color: #FDFBF7; border: 1px solid #F2ECE7; border-radius: 16px; padding: 25px; margin-bottom: 20px;">
              <h3 style="color: #2A3B28; font-family: 'Georgia', serif; font-size: 15px; font-weight: bold; margin: 0 0 15px 0;">📦 What Happens Next?</h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12px; line-height: 1.7; color: #715036;">
                <tr>
                  <td style="vertical-align: top; padding: 5px 10px 5px 0; color: #C17C3A; font-size: 14px;">✦</td>
                  <td style="padding: 5px 0;">Our specialists are preparing your custom herbal products for safe shipment.</td>
                </tr>
                <tr>
                  <td style="vertical-align: top; padding: 5px 10px 5px 0; color: #C17C3A; font-size: 14px;">✦</td>
                  <td style="padding: 5px 0;">Once dispatched, a tracking confirmation email will be sent containing your shipment number.</td>
                </tr>
                <tr>
                  <td style="vertical-align: top; padding: 5px 10px 5px 0; color: #C17C3A; font-size: 14px;">✦</td>
                  <td style="padding: 5px 0;">Expected delivery window across India: <strong>3-5 business days</strong>.</td>
                </tr>
                <tr>
                  <td style="vertical-align: top; padding: 5px 10px 5px 0; color: #C17C3A; font-size: 14px;">✦</td>
                  <td style="padding: 5px 0;">You can track real-time delivery progress inside your PWA Mobile App.</td>
                </tr>
              </table>
            </div>

            <p style="color: #715036; font-size: 12px; text-align: center; margin: 30px 0 0 0; line-height: 1.5;">
              If you have any questions or require custom Ayurvedic counseling, reply directly to this email to contact our wellness team.
            </p>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="background-color: #2A3B28; padding: 30px; text-align: center; border-top: 1px solid #F2ECE7;">
            <p style="color: #A0B09E; font-size: 11px; line-height: 1.6; margin: 0;">
              © ${new Date().getFullYear()} Ayucan Healthcare Private Limited. All rights reserved.<br />
              Delivering lab-tested, pure, next-generation organic wellness.
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;

  await sendEmail({
    email: userEmail,
    subject,
    html
  });
};

module.exports = { sendEmail, sendOTPEmail, sendOrderConfirmationEmail };
