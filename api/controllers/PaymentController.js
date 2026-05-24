
const Razorpay = require("razorpay")
const crypto = require('crypto');
require('dotenv').config();
const { updateOrderToPaid } = require("./OrderController");

// Helper function to get Razorpay instances
const getRazorpayInstances = () => {
  const testKey = process.env.RAZORPAY_KEY_ID_TEST;
  const testSecret = process.env.RAZORPAY_SECRET_TEST;
  const liveKey = process.env.RAZORPAY_KEY_ID_LIVE;
  const liveSecret = process.env.RAZORPAY_SECRET_LIVE;

  if (!testKey || !testSecret) {
    throw new Error('Razorpay test credentials are not configured. Please set RAZORPAY_KEY_ID_TEST and RAZORPAY_SECRET_TEST environment variables.');
  }

  const testInstance = new Razorpay({
    key_id: testKey,
    key_secret: testSecret,
  });

  const liveInstance = new Razorpay({ 
    key_id: liveKey,
    key_secret: liveSecret,
  });

  return { testInstance, liveInstance, testKey, testSecret };
};




 const checkout = async (req, res) => {
    try {
      console.log(req.body);
      
      const { testInstance, liveInstance } = getRazorpayInstances();
      
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
          };
          console.log("before order create",options);
          
          // const order = await instance.orders.create(options);

          //live razorpay instance
          const order = await liveInstance.orders.create(options);

          //razorpay test instance
          // const order = await testInstance.orders.create(options);

          console.log("after order create");

          res.status(200).json({
        
            success: true,
            order,
          });
          
    } catch (error) {
      console.log("something went wrong", error.message);     
        res.status(501).send({message:error.message}) 
    }
 
};

const paymentVerification = async (req, res) => {
  try {
    const event = req.body.event;
    console.log("Razorpay Webhook Event Received:", event);

    const payment = req.body.payload?.payment?.entity;
    if (!payment) {
      return res.status(400).json({ success: false, message: "Invalid payload: no payment entity found" });
    }

    console.log(`Processing Webhook Event: ${event} | Payment ID: ${payment.id} | Order ID: ${payment.order_id} | Status: ${payment.status}`);

    // Define variables based on the webhook event type
    let isAuthorised = false;
    let paymentStatus = "not-paid";

    if (event === "payment.captured" || event === "order.paid") {
      isAuthorised = true;
      paymentStatus = "paid";
    } else if (event === "payment.failed") {
      isAuthorised = false;
      paymentStatus = "failed";
    } else {
      // For any other webhook events (like payment.authorized, etc.), 
      // just log it and return a successful 200 OK response to Razorpay
      console.log(`Unhandled webhook event: ${event}. Acknowledging with 200 OK.`);
      return res.status(200).json({
        success: true,
        message: `Webhook event ${event} acknowledged`
      });
    }

    // Map fields from payment payload securely
    const mockReq = {
      body: {
        authorised: isAuthorised,
        razorpay_payment_id: payment.id,
        razorpay_order_id: payment.order_id,
        paymentStatus: paymentStatus,
        paymentMethod: payment.method || "online",
        upi_payment_id: payment.upi?.vpa || "",
        transaction_id: payment?.acquirer_data?.upi_transaction_id || payment?.acquirer_data?.bank_transaction_id || "",
      },
    };

    const mockRes = {
      json: (data) => data, // Mock the res.json call
      status: (code) => ({
        json: (message) => message, // Mock the res.status().json call
      }),
    };

    console.log("Mocking request to updateOrderToPaid:", mockReq.body);
    await updateOrderToPaid(mockReq, mockRes);
    console.log("updateOrderToPaid executed successfully");

    return res.status(200).json({
      success: true,
      message: `Webhook processed successfully for event: ${event}`,
    });
  } catch (error) {
    console.error("Razorpay Webhook Processing Error:", error.message);
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

 const getKey = (req,res)=>{
  try {
    const testKey = process.env.RAZORPAY_KEY_ID_TEST;
    const testSecret = process.env.RAZORPAY_SECRET_TEST;
    const liveKey = process.env.RAZORPAY_KEY_ID_LIVE;
    const liveSecret = process.env.RAZORPAY_SECRET_LIVE;

    // const { testKey } = getRazorpayInstances();
    res.send({key:liveKey});
    res.send({key:testKey});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
}

module.exports={
    getKey,
    paymentVerification,
    checkout
}
