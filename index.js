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
app.use('/cart',CartRouter)
app.use('/category',CategoryRouter)
app.use('/order',OrderRoutes);
app.use('/payment',PaymentRoutes);
app.use('/blogs',BlogRoutes)
app.use('/contact',contactRoutes)


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

app.get('/', (req, res) =>{
  const testKey =  process.env.RAZORPAY_KEY_ID_TEST;
  const testSecret = process.env.RAZORPAY_SECRET_TEST;

  console.log("process.env.RAZORPAY_KEY_ID_TEST: ",process.env.RAZORPAY_KEY_ID_TEST)
  console.log("process.env.RAZORPAY_SECRET_TEST: ",process.env.RAZORPAY_SECRET_TEST)
  console.log("process.env.RAZORPAY_KEY_ID_LIVE: ",process.env.RAZORPAY_KEY_ID_LIVE)
  console.log("process.env.RAZORPAY_SECRET_LIVE: ",process.env.RAZORPAY_SECRET_LIVE)
  console.log("testKey: ",testKey)
  console.log("testSecret: ",testSecret)

  console.log("welcome our app");
   res.send('welcome our app')
  });

//const CONNECTION_URL = process.env.MONGO_URI;
const CONNECTION_URL="mongodb+srv://hemant9808:ySEEecsHJArJfzfA@mydb.ovbqzxf.mongodb.net/chatApp";
//const CONNECTION_URL = "mongodb://127.0.0.1:27017/chatApp";


const PORT = process.env.PORT || 4000;

mongoose 
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
