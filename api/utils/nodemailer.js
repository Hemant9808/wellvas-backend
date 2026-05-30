// utils/email.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter object for sending emails
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "ayucanhealthcare@gmail.com",
      pass: "uzxeaehplrigbcef",
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
    html: options.html
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

// Function to send OTP email (Minimalist UI)
const sendOTPEmail = async (email, otp, purpose = 'signup') => {
  const subject = purpose === 'signup'
    ? 'Verify Your Email - Ayucan'
    : 'Password Reset OTP - Ayucan';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #333333; margin: 0; padding: 40px 20px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; text-align: left;">
        <!-- Logo Header -->
        <tr>
          <td style="padding: 20px 0 30px 0; text-align: center;">
            <h1 style="font-family: 'Times New Roman', Georgia, serif; font-size: 24px; font-weight: normal; letter-spacing: 5px; color: #2A3B28; margin: 0; text-transform: uppercase; display: inline-block;">AYUCAN</h1>
            <p style="font-size: 10px; color: #C17C3A; letter-spacing: 2px; text-transform: uppercase; margin: 5px 0 0 0; font-weight: 500;">Premium Ayurvedic Wellness</p>
          </td>
        </tr>
        
        <tr>
          <td style="padding: 30px 0; border-top: 1px solid #eaeaea;">
            <h2 style="font-family: 'Times New Roman', Georgia, serif; font-size: 18px; font-weight: normal; color: #2A3B28; margin: 0 0 15px 0;">
              ${purpose === 'signup' ? 'Verify Your Account' : 'Reset Your Password'}
            </h2>
            
            <p style="font-size: 13px; line-height: 1.6; color: #666666; margin: 0 0 25px 0;">
              ${purpose === 'signup' 
                ? 'Welcome to the wellness family! Please enter the secure verification code below to complete your Ayucan registration. This code is active for 10 minutes.'
                : 'We received a request to reset your account password. Please enter the secure verification code below. This code is active for 10 minutes.'
              }
            </p>
            
            <!-- OTP Container -->
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #FDFBF7; border: 1px solid #E2ECE1; border-radius: 8px; padding: 15px 30px; display: inline-block;">
                <span style="font-family: Menlo, Monaco, Consolas, Courier, monospace; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #2A3B28;">${otp}</span>
              </div>
            </div>
            
            <p style="font-size: 11px; line-height: 1.6; color: #999999; margin: 30px 0 0 0; text-align: center; font-style: italic;">
              If you did not request this verification code, you can safely ignore this email. Your account security is preserved.
            </p>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="padding: 30px 0; border-top: 1px solid #eaeaea; text-align: center;">
            <p style="font-size: 10px; line-height: 1.6; color: #999999; margin: 0;">
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

// Function to send order confirmation email (Minimalist UI)
const sendOrderConfirmationEmail = async (userEmail, userName, orderDetails) => {
  const subject = 'Order Confirmation - Ayucan';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #333333; margin: 0; padding: 40px 20px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; text-align: left;">
        <!-- Logo Header -->
        <tr>
          <td style="padding: 20px 0 30px 0; text-align: center;">
            <h1 style="font-family: 'Times New Roman', Georgia, serif; font-size: 24px; font-weight: normal; letter-spacing: 5px; color: #2A3B28; margin: 0; text-transform: uppercase; display: inline-block;">AYUCAN</h1>
            <p style="font-size: 10px; color: #C17C3A; letter-spacing: 2px; text-transform: uppercase; margin: 5px 0 0 0; font-weight: 500;">Premium Ayurvedic Wellness</p>
          </td>
        </tr>
        
        <!-- Content Body -->
        <tr>
          <td style="padding: 30px 0; border-top: 1px solid #eaeaea;">
            <h2 style="font-family: 'Times New Roman', Georgia, serif; font-size: 18px; font-weight: normal; color: #2A3B28; margin: 0 0 10px 0;">Order Confirmed</h2>
            <p style="font-size: 13px; line-height: 1.6; color: #666666; margin: 0 0 25px 0;">
              Dear ${userName || 'Wellness Seeker'},<br /><br />
              Thank you for choosing Ayucan. We have successfully received your payment, and your journey to premium Ayurvedic wellness has officially begun!
            </p>

            <!-- Billing Details Table -->
            <h3 style="font-family: 'Times New Roman', Georgia, serif; font-size: 14px; font-weight: bold; color: #2A3B28; margin: 25px 0 10px 0; border-bottom: 1px solid #eaeaea; padding-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">Invoice Details</h3>
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px; font-size: 12px; line-height: 2;">
              <tr>
                <td style="padding: 6px 0; color: #666666; width: 40%;">Order ID</td>
                <td style="padding: 6px 0; color: #333333; font-weight: 600; word-break: break-all;">${orderDetails.razorpay_order_id || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666666;">Payment ID</td>
                <td style="padding: 6px 0; color: #333333; word-break: break-all;">${orderDetails.razorpay_payment_id || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666666;">Payment Method</td>
                <td style="padding: 6px 0; color: #333333; text-transform: uppercase; font-weight: 500;">${orderDetails.paymentMethod || 'Prepaid'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666666;">Date Ordered</td>
                <td style="padding: 6px 0; color: #333333;">${new Date(orderDetails.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
              <tr style="border-top: 1px solid #eaeaea;">
                <td style="padding: 8px 0; color: #2A3B28; font-weight: bold; font-size: 13px;">Total Price</td>
                <td style="padding: 8px 0; color: #C17C3A; font-weight: bold; font-size: 14px;">₹${orderDetails.totalPrice}</td>
              </tr>
            </table>

            <!-- Next Steps -->
            <h3 style="font-family: 'Times New Roman', Georgia, serif; font-size: 14px; font-weight: bold; color: #2A3B28; margin: 25px 0 10px 0; border-bottom: 1px solid #eaeaea; padding-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">What Happens Next</h3>
            <ul style="font-size: 12px; line-height: 1.6; color: #666666; padding-left: 20px; margin: 0 0 25px 0;">
              <li style="margin-bottom: 6px;">Our specialists are preparing your custom herbal products for safe shipment.</li>
              <li style="margin-bottom: 6px;">Once dispatched, a tracking confirmation email will be sent containing your shipment number.</li>
              <li style="margin-bottom: 6px;">Expected delivery window across India: <strong>3-5 business days</strong>.</li>
            </ul>

            <p style="font-size: 11px; line-height: 1.5; color: #999999; margin: 30px 0 0 0; text-align: center;">
              If you have any questions or require custom Ayurvedic counseling, simply reply directly to this email to contact our wellness team.
            </p>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="padding: 30px 0; border-top: 1px solid #eaeaea; text-align: center;">
            <p style="font-size: 10px; line-height: 1.6; color: #999999; margin: 0;">
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

// Function to send abandoned checkout recovery email (Minimalist UI)
const sendCheckoutRecoveryEmail = async (userEmail, userName, productDisplay, totalPrice, recoveryLink) => {
  const subject = 'Recover Your Cart - Complete Your Journey with Ayucan';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #333333; margin: 0; padding: 40px 20px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; text-align: left;">
        <!-- Logo Header -->
        <tr>
          <td style="padding: 20px 0 30px 0; text-align: center;">
            <h1 style="font-family: 'Times New Roman', Georgia, serif; font-size: 24px; font-weight: normal; letter-spacing: 5px; color: #2A3B28; margin: 0; text-transform: uppercase; display: inline-block;">AYUCAN</h1>
            <p style="font-size: 10px; color: #C17C3A; letter-spacing: 2px; text-transform: uppercase; margin: 5px 0 0 0; font-weight: 500;">Premium Ayurvedic Wellness</p>
          </td>
        </tr>
        
        <!-- Content Body -->
        <tr>
          <td style="padding: 30px 0; border-top: 1px solid #eaeaea;">
            <h2 style="font-family: 'Times New Roman', Georgia, serif; font-size: 18px; font-weight: normal; color: #2A3B28; margin: 0 0 10px 0;">🌸 Complete Your Wellness Order</h2>
            <p style="font-size: 13px; line-height: 1.6; color: #666666; margin: 0 0 20px 0;">
              Dear ${userName || 'Wellness Seeker'},<br /><br />
              We noticed you started checking out on our website but couldn't complete the payment for your chosen Ayurvedic items. Your custom selected wellness routine is still saved for you!
            </p>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px; font-size: 12px; line-height: 2;">
              <tr style="border-bottom: 1px solid #eaeaea;">
                <td style="padding: 6px 0; color: #666666; width: 40%;">Items in Cart</td>
                <td style="padding: 6px 0; color: #333333; font-weight: 600;">${productDisplay || 'Ayurvedic Wellness Products'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #2A3B28; font-weight: bold; font-size: 13px;">Cart Value</td>
                <td style="padding: 8px 0; color: #C17C3A; font-weight: bold; font-size: 14px;">₹${totalPrice}</td>
              </tr>
            </table>

            <!-- Complete Button -->
            <div style="text-align: center; margin: 25px 0;">
              <a href="${recoveryLink || 'https://ayucan.com/checkout'}" style="background-color: #2A3B28; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 6px; display: inline-block; tracking-wider: 1px; cursor: pointer;">
                Complete Your Purchase
              </a>
            </div>

            <!-- Alternative / Support -->
            <p style="font-size: 11px; line-height: 1.6; color: #999999; margin: 20px 0 0 0; background-color: #fafafa; border-radius: 6px; padding: 12px; font-style: italic;">
              <strong>💡 Prefer Cash on Delivery (COD)?</strong> If you experienced technical issues with the payment window or prefer to pay at your doorstep, simply reply directly to this email or call our support team. We'd be happy to convert this into a Cash on Delivery order and ship it immediately!
            </p>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="padding: 30px 0; border-top: 1px solid #eaeaea; text-align: center;">
            <p style="font-size: 10px; line-height: 1.6; color: #999999; margin: 0;">
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

module.exports = { sendEmail, sendOTPEmail, sendOrderConfirmationEmail, sendCheckoutRecoveryEmail };
