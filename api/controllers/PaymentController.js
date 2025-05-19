
const Razorpay = require("razorpay")
const crypto = require('crypto');
const { updateOrderToPaid } = require("./OrderController");
// import { Payment } from "../models/paymentModel.js";
// const instance = require("../../index.js")

const instance = new Razorpay({
    key_id: "rzp_test_Mq75DuYIXcejGr",
    key_secret:"2YaFnkiQArYObRYboB6n5mOX",
  });


 const checkout = async (req, res) => {
    try {
      console.log(req.body);
      
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
          };
          console.log("before order create",options);
          
          const order = await instance.orders.create(options);
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
    console.log("paymentVerification");
    
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log(
    "credentials",
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256","2YaFnkiQArYObRYboB6n5mOX")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const mockReq = {
       // params: { razorpay_order_id: req.params.order_id },
        body: {
           razorpay_payment_id,
           razorpay_order_id,
           paymentStatus:"paid",
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
    
    res.redirect(
      // `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
            `http://localhost:3000/`

    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

 const getKey = (req,res)=>{
  res.send({key:"rzp_test_Mq75DuYIXcejGr"});
}
module.exports={
    getKey,
    paymentVerification,
    checkout

}
