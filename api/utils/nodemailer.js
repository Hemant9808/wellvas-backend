// utils/email.js
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');

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
    html: options.html || options.message,
    attachments: options.attachments || []
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

// Helper function to generate a pristine, minimal PDF Invoice in memory
const generateInvoicePDF = (orderDetails, userName) => {
  return new Promise((resolve, reject) => {
    try {
      const path = require('path');
      const fs = require('fs');

      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // Colors
      const primaryColor = '#2A3B28'; // Ayucan Forest Green
      const secondaryColor = '#C17C3A'; // Golden Bronze
      const textColor = '#1f2937'; // Dark Gray
      const mutedColor = '#6b7280'; // Gray
      const lightLineColor = '#eaeaea';

      // 1. Branding Header & Logo
      const logoPath = path.join(__dirname, '../../../charak/public/ResourseImages/logo.png');
      const hasLogo = fs.existsSync(logoPath);

      if (hasLogo) {
        // Draw logo at X=50, Y=40, Width=45
        doc.image(logoPath, 50, 40, { width: 45 });
        doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(26).text('AYUCAN', 110, 43, { tracking: 4 });
        doc.fillColor(secondaryColor).font('Helvetica-Bold').fontSize(9).text('PREMIUM AYURVEDIC WELLNESS', 110, 69, { tracking: 2 });
      } else {
        doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(26).text('AYUCAN', 50, 45, { tracking: 4 });
        doc.fillColor(secondaryColor).font('Helvetica-Bold').fontSize(9).text('PREMIUM AYURVEDIC WELLNESS', 50, 71, { tracking: 2 });
      }

      // 2. Invoice Meta Block (Top Right-ish using absolute positioning)
      const topY = 50;
      doc.fillColor(textColor).font('Helvetica-Bold').fontSize(14).text('TAX INVOICE', 380, topY, { align: 'right' });
      doc.font('Helvetica').fontSize(9).fillColor(mutedColor);
      
      const paymentId = orderDetails.razorpay_payment_id || 
        orderDetails.paymentResult?.razorpay_payment_id || 
        (orderDetails.paymentResult?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'N/A');
      const paymentMethod = orderDetails.paymentMethod || 
        orderDetails.paymentResult?.paymentMethod || 
        'Prepaid';
      const createdAt = orderDetails.createdAt || Date.now();
      const dateStr = new Date(createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

      // Generate a highly professional tax invoice number (e.g. AYU-2026-B8C9D0E1)
      const orderYear = new Date(createdAt).getFullYear();
      const rawId = orderDetails._id || orderDetails.razorpay_order_id || 'order';
      const uniqueSuffix = rawId.toString().slice(-8).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
      const invoiceNumber = `AYU-${orderYear}-${uniqueSuffix || 'XXXX'}`;

      doc.text(`Invoice No: ${invoiceNumber}`, 380, topY + 20, { align: 'right' });
      doc.text(`Date: ${dateStr}`, 380, topY + 32, { align: 'right' });
      doc.text(`Payment: ${paymentMethod.toUpperCase()}`, 380, topY + 44, { align: 'right' });
      
      doc.y = topY + 70; // Reset Y

      // Draw line
      doc.strokeColor(lightLineColor).lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(1.5);

      // 3. Billing & Shipping Address
      const addressY = doc.y;
      doc.fillColor(textColor).font('Helvetica-Bold').fontSize(11).text('BILLED TO:', 50, addressY);
      doc.font('Helvetica').fontSize(10).fillColor(textColor).text(userName || 'Wellness Seeker', 50, addressY + 16);
      
      if (orderDetails.shippingAddress) {
        const sa = orderDetails.shippingAddress;
        doc.fillColor(mutedColor);
        doc.text(sa.address || '', 50, addressY + 28, { width: 220 });
        doc.text(`${sa.city || ''}, ${sa.state || ''} - ${sa.pincode || ''}`, 50, doc.y);
        doc.text(`Phone: ${sa.phone || ''}`, 50, doc.y);
        if (sa.email) {
          doc.text(`Email: ${sa.email}`, 50, doc.y);
        }
      } else {
        doc.fillColor(mutedColor).text('N/A', 50, addressY + 28);
      }

      // Sold By (Ayucan Info)
      doc.fillColor(textColor).font('Helvetica-Bold').fontSize(11).text('SOLD BY:', 320, addressY);
      doc.font('Helvetica').fontSize(10).fillColor(textColor).text('Ayucan Healthcare Pvt. Ltd.', 320, addressY + 16);
      doc.fillColor(mutedColor);
      doc.text('FSSAI Approved Facility', 320, addressY + 28);
      doc.text('Sector 5, Noida, UP, India', 320, doc.y);
      doc.text('GSTIN: 09AAHCA2026M1Z2', 320, doc.y);
      doc.text('support@ayucan.com', 320, doc.y);

      doc.moveDown(3);

      // 4. Items Table
      doc.y = doc.y + 15; // Set starting Y for table
      const tableHeaderY = doc.y;
      doc.fillColor(textColor).font('Helvetica-Bold').fontSize(9);
      doc.text('DESCRIPTION', 50, tableHeaderY);
      doc.text('UNIT PRICE', 300, tableHeaderY, { width: 80, align: 'right' });
      doc.text('QTY', 390, tableHeaderY, { width: 50, align: 'right' });
      doc.text('AMOUNT', 465, tableHeaderY, { width: 80, align: 'right' });
      doc.moveDown(0.5);

      // Draw header line
      doc.strokeColor(primaryColor).lineWidth(1.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.8);

      // Render items
      const items = orderDetails.items || [];
      doc.font('Helvetica').fontSize(9.5).fillColor(textColor);
      
      let sumOfMRPs = 0;
      let sumOfSellingPrices = 0;

      if (items.length > 0) {
        items.forEach((item) => {
          const itemY = doc.y;
          const name = item.productId?.name || item.name || 'Ayurvedic Wellness Product';
          const qty = item.quantity || 1;
          
          // Get original MRP price and actual selling price
          const originalPrice = item.price || item.productId?.price || 0;
          const discountPrice = item.discountPrice || item.productId?.discountPrice || originalPrice;
          
          sumOfMRPs += originalPrice * qty;
          sumOfSellingPrices += discountPrice * qty;
          
          doc.text(name, 50, itemY, { width: 230 });
          
          // Unit Price - show Selling Price, with a small MRP note underneath if discounted
          if (originalPrice > discountPrice) {
            doc.text(`INR ${discountPrice.toFixed(2)}`, 300, itemY, { width: 80, align: 'right' });
            doc.fillColor(mutedColor).fontSize(7.5);
            doc.text(`(MRP ${originalPrice.toFixed(2)})`, 300, itemY + 11, { width: 80, align: 'right' });
            doc.fillColor(textColor).fontSize(9.5); // Reset font style
          } else {
            doc.text(`INR ${originalPrice.toFixed(2)}`, 300, itemY, { width: 80, align: 'right' });
          }

          doc.text(qty.toString(), 390, itemY, { width: 50, align: 'right' });
          doc.text(`INR ${(discountPrice * qty).toFixed(2)}`, 465, itemY, { width: 80, align: 'right' });
          
          doc.moveDown(1.5);
        });
      } else {
        doc.text('Product details not available', 50, doc.y);
        doc.moveDown(1.5);
      }

      // Draw bottom table line
      doc.strokeColor(lightLineColor).lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(1);

      // Support legacy subtotal from order document if sum is 0
      const displayMRPSubtotal = sumOfMRPs || orderDetails.totalPrice || 0;
      const displaySellingSubtotal = sumOfSellingPrices || orderDetails.totalPrice || 0;
      const productDiscount = Math.max(0, displayMRPSubtotal - displaySellingSubtotal);

      // 5. Invoice Totals Block
      const totalsY = doc.y;
      doc.fillColor(textColor).font('Helvetica-Bold').fontSize(10);
      
      // Subtotal (MRP)
      doc.text('Subtotal (MRP):', 320, totalsY, { width: 120, align: 'right' });
      doc.font('Helvetica').text(`INR ${displayMRPSubtotal.toFixed(2)}`, 450, totalsY, { width: 95, align: 'right' });
      doc.moveDown(0.8);

      // Product Savings (Product Discount)
      if (productDiscount > 0) {
        const pdy = doc.y;
        doc.fillColor('#10b981').font('Helvetica-Bold').text('Product Discount:', 320, pdy, { width: 120, align: 'right' });
        doc.font('Helvetica').text(`-INR ${productDiscount.toFixed(2)}`, 450, pdy, { width: 95, align: 'right' });
        doc.moveDown(0.8);
      }

      // Coupon Discount
      const couponDiscount = orderDetails.couponDiscount || 0;
      if (couponDiscount > 0) {
        const cy = doc.y;
        doc.fillColor('#10b981').font('Helvetica-Bold').text(`Coupon Discount (${orderDetails.couponCode || 'Coupon'}):`, 320, cy, { width: 120, align: 'right' });
        doc.font('Helvetica').text(`-INR ${couponDiscount.toFixed(2)}`, 450, cy, { width: 95, align: 'right' });
        doc.moveDown(0.8);
      }

      // Prepaid Discount
      const totalDiscountPrice = orderDetails.totalDiscountPrice || displaySellingSubtotal;
      const prepaidDiscount = paymentMethod === 'online' ? (displaySellingSubtotal - totalDiscountPrice - couponDiscount) : 0;
      if (prepaidDiscount > 0) {
        const py = doc.y;
        doc.fillColor('#10b981').font('Helvetica-Bold').text('Prepaid Discount:', 320, py, { width: 120, align: 'right' });
        doc.font('Helvetica').text(`-INR ${prepaidDiscount.toFixed(2)}`, 450, py, { width: 95, align: 'right' });
        doc.moveDown(0.8);
      }

      // Shipping
      const sy = doc.y;
      doc.fillColor(textColor).font('Helvetica-Bold').text('Shipping:', 320, sy, { width: 120, align: 'right' });
      doc.font('Helvetica').text('FREE', 450, sy, { width: 95, align: 'right' });
      doc.moveDown(1.2);

      // Final Total
      const finalY = doc.y;
      doc.strokeColor(lightLineColor).lineWidth(1).moveTo(350, finalY - 4).lineTo(545, finalY - 4).stroke();
      
      doc.fillColor(secondaryColor).font('Helvetica-Bold').fontSize(12);
      doc.text('Grand Total:', 320, finalY + 4, { width: 120, align: 'right' });
      doc.text(`INR ${totalDiscountPrice.toFixed(2)}`, 450, finalY + 4, { width: 95, align: 'right' });

      // 6. Invoice Footer
      const footerY = 720;
      doc.strokeColor(lightLineColor).lineWidth(1).moveTo(50, footerY).lineTo(545, footerY).stroke();
      
      doc.fillColor(mutedColor).font('Helvetica-Oblique').fontSize(8);
      doc.text('Thank you for choosing Ayucan.', 50, footerY + 12, { align: 'center' });
      doc.text('This is a computer generated invoice and does not require a physical signature.', 50, footerY + 24, { align: 'center' });
      doc.text('For queries, please email support@ayucan.com or call +91 8799722636.', 50, footerY + 36, { align: 'center' });

      doc.end();
    } catch (pdfError) {
      reject(pdfError);
    }
  });
};

// Function to send order confirmation email (Minimalist UI)
const sendOrderConfirmationEmail = async (userEmail, userName, orderDetails) => {
  const subject = 'Order Confirmation - Ayucan';

  const paymentId = orderDetails.razorpay_payment_id || 
    orderDetails.paymentResult?.razorpay_payment_id || 
    (orderDetails.paymentResult?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'N/A');
  const paymentMethod = orderDetails.paymentMethod || 
    orderDetails.paymentResult?.paymentMethod || 
    'Prepaid';
  const createdAt = orderDetails.createdAt || Date.now();
  const totalPrice = orderDetails.totalDiscountPrice || orderDetails.totalPrice || 0;

  // Generate a highly professional tax invoice number (e.g. AYU-2026-B8C9D0E1)
  const orderYear = new Date(createdAt).getFullYear();
  const rawId = orderDetails._id || orderDetails.razorpay_order_id || 'order';
  const uniqueSuffix = rawId.toString().slice(-8).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
  const invoiceNumber = `AYU-${orderYear}-${uniqueSuffix || 'XXXX'}`;

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
              Thank you for choosing Ayucan. Your journey to premium Ayurvedic wellness has officially begun! We have successfully confirmed your order, and a detailed tax invoice has been attached to this email.
            </p>

            <!-- Billing Details Table -->
            <h3 style="font-family: 'Times New Roman', Georgia, serif; font-size: 14px; font-weight: bold; color: #2A3B28; margin: 25px 0 10px 0; border-bottom: 1px solid #eaeaea; padding-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">Invoice Details</h3>
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px; font-size: 12px; line-height: 2;">
              <tr>
                <td style="padding: 6px 0; color: #666666; width: 40%;">Invoice No</td>
                <td style="padding: 6px 0; color: #333333; font-weight: 600; word-break: break-all;">${invoiceNumber}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666666;">Payment ID</td>
                <td style="padding: 6px 0; color: #333333; word-break: break-all;">${paymentId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666666;">Payment Method</td>
                <td style="padding: 6px 0; color: #333333; text-transform: uppercase; font-weight: 500;">${paymentMethod}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666666;">Date Ordered</td>
                <td style="padding: 6px 0; color: #333333;">${new Date(createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
              <tr style="border-top: 1px solid #eaeaea;">
                <td style="padding: 8px 0; color: #2A3B28; font-weight: bold; font-size: 13px;">Total Price</td>
                <td style="padding: 8px 0; color: #C17C3A; font-weight: bold; font-size: 14px;">₹${totalPrice}</td>
              </tr>
            </table>

            <!-- Next Steps -->
            <h3 style="font-family: 'Times New Roman', Georgia, serif; font-size: 14px; font-weight: bold; color: #2A3B28; margin: 25px 0 10px 0; border-bottom: 1px solid #eaeaea; padding-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">What Happens Next</h3>
            <ul style="font-size: 12px; line-height: 1.6; color: #666666; padding-left: 20px; margin: 0 0 25px 0;">
              <li style="margin-bottom: 6px;">Our specialists are preparing your organic wellness products for safe shipment.</li>
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

  // Generate and attach PDF invoice
  let attachments = [];
  try {
    const pdfBuffer = await generateInvoicePDF(orderDetails, userName);
    attachments.push({
      filename: `invoice_${invoiceNumber}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    });
    console.log(`[Email] Invoice PDF generated successfully for order ${invoiceNumber}`);
  } catch (pdfError) {
    console.error(`[Email] Error generating invoice PDF for order ${invoiceNumber}:`, pdfError);
  }

  await sendEmail({
    email: userEmail,
    subject,
    html,
    attachments
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

module.exports = { sendEmail, sendOTPEmail, sendOrderConfirmationEmail, sendCheckoutRecoveryEmail, generateInvoicePDF };
