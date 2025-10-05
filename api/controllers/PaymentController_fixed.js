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

  return { testInstance, liveInstance, testKey, testSecret, liveKey, liveSecret };
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
    console.log("paymentVerification called ...........");
    console.log("req.body: ", JSON.stringify(req.body, null, 2));
    
    try {
      // Handle different webhook payload formats
      let payment, razorpay_order_id, razorpay_payment_id, razorpay_signature;
      
      // Check if it's a Razorpay webhook payload
      if (req.body.payload && req.body.payload.payment && req.body.payload.payment.entity) {
        // Razorpay webhook format
        payment = req.body.payload.payment.entity;
        razorpay_order_id = payment.order_id;
        razorpay_payment_id = payment.id;
        razorpay_signature = req.body.payload.payment.entity.signature;
      } else if (req.body.razorpay_order_id) {
        // Direct payment verification format
        razorpay_order_id = req.body.razorpay_order_id;
        razorpay_payment_id = req.body.razorpay_payment_id;
        razorpay_signature = req.body.razorpay_signature;
        payment = {
          id: razorpay_payment_id,
          order_id: razorpay_order_id,
          status: 'captured',
          method: req.body.paymentMethod || 'upi',
          upi: { vpa: req.body.upi_payment_id || '' },
          acquirer_data: { upi_transaction_id: req.body.transaction_id }
        };
      } else {
        console.log("Invalid webhook payload format");
        return res.status(200).json({
          success: false,
          message: "Invalid webhook payload format"
        });
      }

      console.log("Webhook credentials:", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature: razorpay_signature ? 'present' : 'missing'
      });

      // Validate webhook signature if present
      if (razorpay_signature) {
        const { liveSecret } = getRazorpayInstances();
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
          .createHmac("sha256", liveSecret)
          .update(body.toString())
          .digest("hex");
        
        const isAuthentic = expectedSignature === razorpay_signature;
        if (!isAuthentic) {
          console.log("Webhook signature validation failed");
          return res.status(200).json({
            success: false,
            message: "Invalid webhook signature"
          });
        }
      }

      // Prepare data for order update
      const mockReq = {
        body: {
          authorised: true,
          razorpay_payment_id: payment.id,
          razorpay_order_id: payment.order_id,
          paymentStatus: payment.status === 'captured' ? 'paid' : payment.status,
          paymentMethod: payment.method || 'upi',
          upi_payment_id: payment.upi?.vpa || '',
          transaction_id: payment?.acquirer_data?.upi_transaction_id || '',
        },
      };

      const mockRes = {
        json: (data) => data,
        status: (code) => ({
          json: (message) => message,
        }),
      };

      console.log("Processing order update with data:", mockReq.body);
      
      // Update order status
      await updateOrderToPaid(mockReq, mockRes);
      console.log("Order updated successfully");

      // Return success response immediately
      return res.status(200).json({
        success: true,
        message: "webhook processed successfully",
      });
      
    } catch (error) {
      console.error("Webhook processing error:", error);
      
      // Always return 200 to prevent webhook deactivation
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
};

const getKey = (req,res)=>{
  try {
    // const { testKey } = getRazorpayInstances();
    res.send({key:"rzp_live_BTUEwJ6xKyzFkV"});
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
