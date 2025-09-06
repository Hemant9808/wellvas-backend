
const Razorpay = require("razorpay")
const crypto = require('crypto');
require('dotenv').config();
const { updateOrderToPaid } = require("./OrderController");

//live key
  const liveInstance = new Razorpay({ 
    key_id: process.env.RAZORPAY_KEY_ID_LIVE,
    key_secret: process.env.RAZORPAY_SECRET_LIVE,
    });

  const testKey =  process.env.RAZORPAY_KEY_ID_TEST ;
  const testSecret = process.env.RAZORPAY_SECRET_TEST;

  const testInstance = new Razorpay({
    key_id: testKey,
    key_secret:testSecret,
  });




 const checkout = async (req, res) => {
    try {
      console.log(req.body);
      
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
          };
          console.log("before order create",options);
          
          // const order = await instance.orders.create(options);

          //live razorpay instance
          // const order = await liveInstance.orders.create(options);

          //razorpay test instance
          const order = await testInstance.orders.create(options);

          console.log("after order create");

          res.status(200).json({
        
            success: true,
            order,
          });
          
    } catch (error) {
      console.log("something wen wrong");     
        res.status(501).send({message:error.message}) 
    }
 
};

 const paymentVerification = async (req, res) => {
    // console.log("paymentVerification called ...........");
    // console.log("req.body: ",req.body)
    const payment = req.body.payload.payment.entity;
    // console.log("req.body.payload: ",payment.amount,payment.order_id,payment.id,payment.status,payment.method,payment.upi.vpa)
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log(
    "credentials",
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  // const body = razorpay_order_id + "|" + razorpay_payment_id;

  // const expectedSignature = crypto
  //   .createHmac("sha256","2YaFnkiQArYObRYboB6n5mOX")
  //   .update(body.toString())
  //   .digest("hex");

  // const isAuthentic = expectedSignature === razorpay_signature;
  
  try{
    const mockReq = {
       // params: { razorpay_order_id: req.params.order_id },
        body: {
          authorised:true,
           razorpay_payment_id : payment.id,
           razorpay_order_id:payment.order_id,
           paymentStatus:"paid",
           paymentMethod:payment.method,
           upi_payment_id:payment.upi.vpa,
           transaction_id:payment?.acquirer_data?.upi_transaction_id,
           
        },
      };
      const mockRes = {
        json: (data) => data, // Mock the res.json call
        status: (code) => ({
          json: (message) => message, // Mock the res.status().json call
        }),
        
      };

      
    console.log("mockReq",mockReq);
    
    await updateOrderToPaid(mockReq, mockRes);
    console.log("updateOrderToPaid called");

    //send email to user
      









    return res.status(200).json({
      success: true,
      message: "webhook processed successfully",
 
    });
    
  
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

 const getKey = (req,res)=>{
  // res.send({key:"rzp_live_BTUEwJ6xKyzFkV"});
  res.send({key:testKey});
}

module.exports={
    getKey,
    paymentVerification,
    checkout
}
