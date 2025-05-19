// utils/email.js
const nodemailer = require('nodemailer');
const { emailTemp,temp2,temp4,old,home,home2,home3 } = require('./abc');
const { template, template2, emailVerificationTemplate, lotteryPurchaseTemplate, winnerAnnouncementTemplate, newsletterSubscriptionTemplate, passwordResetTemplate, lotteryPurchaseTemplate1, temp11, temp12 } = require('./constant');

const sendEmail = async () => {
  // 1. Create a transporter object for sending emails
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email service provider
    auth: {
        user: "hemant@adirayglobal.com",
        pass: "ogmnatcklinhjoyl",
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: "hemant@adirayglobal.com",
    // to: "kumarbittu.co@gmail.com",
    // to: "lalit@threely.io",
    to: "hemant27134@gmail.com",
    // bcc: "hemant27134@gmail.com",

    // neeleshishu021@gmail.com

    //to: options.email, // list of receivers
    subject:"kdnf", 
    html:temp12
    // text: options.message, // plain text body
    // html: options.html, // you can also send HTML instead of plain text
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
