const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRouter = require('./api/routes/AuthRouter');
const productRouter = require('./api/routes/ProductRouter');
const CartRouter = require('./api/routes/CartRouter');
const CategoryRouter = require('./api/routes/CategoryRouter');
const OrderRoutes = require('./api/routes/OrderRouter');
const PaymentRoutes = require('./api/routes/PaymentRouter');
const BlogRoutes = require('./api/routes/BlogRouter')
const contactRoutes = require('./api/routes/ContactRoutes');
const ReviewRouter = require('./api/routes/ReviewRouter');
const CouponRouter = require('./api/routes/CouponRouter');
const OfflineCustomerRouter = require('./api/routes/OfflineCustomerRouter');
const OfflineInvoiceRouter = require('./api/routes/OfflineInvoiceRouter');
const RewardRouter = require('./api/routes/RewardRouter');
// import Razorpay from "razorpay";
const Razorpay = require("razorpay")

const cron = require('node-cron');
const { cleanupExpiredOTPs } = require('./api/utils/otpUtils');

require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use(cors()); 
app.use(cors({ origin: '*' }));

// Session middleware for OTP functionality
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
    maxAge: 10 * 60 * 1000 // 10 minutes (same as OTP expiry)
  }
}));

//  const instance = new Razorpay({
//   key_id: "rzp_test_Mq75DuYIXcejGr",
//   key_secret:"2YaFnkiQArYObRYboB6n5mOX",
// });
// module.exports= instance;



// routers
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/cart', CartRouter)
app.use('/category', CategoryRouter)
app.use('/order', OrderRoutes);
app.use('/payment', PaymentRoutes);
app.use('/blogs', BlogRoutes)
app.use('/contact', contactRoutes)
app.use('/reviews', ReviewRouter)
app.use('/coupons', CouponRouter)
app.use('/offline-customers', OfflineCustomerRouter)
app.use('/offline-invoices', OfflineInvoiceRouter)
app.use('/rewards', RewardRouter)


// Clean up expired OTPs every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    const cleanedCount = await cleanupExpiredOTPs();
    if (cleanedCount > 0) {
      console.log(`Cleaned up ${cleanedCount} expired OTPs`);
    }
  } catch (error) {
    console.error('Error in OTP cleanup cron job:', error);
  }
});

// cron.schedule('* * * * *', () => {
//   console.log('Running task every minute');
//   axios.get('https://medimart-nayg.onrender.com/keep-alive')
//         .then(response => {
//             console.log('Response:', response.status);
//         })
//         .catch(error => {
//             console.error('Error sending keep-alive:', error);
//         });
// });
// app.get('/keep-alive', (req, res) => {
//   res.status(200).send('Server is awake!');
// });

app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: center; padding: 50px 20px; background-color: #FDFBF7; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0; box-sizing: border-box;">
      <div style="background-color: #ffffff; padding: 45px 30px; border-radius: 24px; box-shadow: 0 10px 30px rgba(42,59,40,0.05); border: 1px solid rgba(113,80,54,0.1); max-width: 500px; width: 100%;">
        <h1 style="color: #2A3B28; font-family: 'Georgia', serif; font-size: 32px; letter-spacing: 4px; margin: 0 0 8px 0; text-transform: uppercase;">AYUCAN</h1>
        <p style="color: #C17C3A; font-size: 10px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 25px 0;">Premium Ayurvedic Wellness</p>
        <div style="display: inline-block; background-color: #EBF7EE; color: #1E6B30; font-size: 12px; font-weight: bold; padding: 8px 20px; border-radius: 50px; margin-bottom: 25px; border: 1px solid #C2EDCD; text-transform: uppercase; letter-spacing: 1px;">
          🟢 Server Status: Live & Optimized
        </div>
        <p style="color: #715036; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
          Your backend REST API, secure Razorpay verification, fuzzy search systems, and premium mailers are fully loaded and operational.
        </p>
        <div style="border-t: 1px solid #F2ECE7; border-top: 1px solid #F2ECE7; padding-top: 20px; font-size: 11px; color: #715036/60;">
          System Connection Status: Connected & Verified
        </div>
      </div>
    </div>
  `);
});

//const CONNECTION_URL = process.env.MONGO_URI;
const CONNECTION_URL = "mongodb+srv://hemant9808:ySEEecsHJArJfzfA@mydb.ovbqzxf.mongodb.net/chatApp";
//const CONNECTION_URL = "mongodb://127.0.0.1:27017/chatApp";


const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
