const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
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

require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use(cors()); 
app.use(cors({ origin: '*' }));

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
