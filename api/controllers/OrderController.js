const Cart = require('../models/CartModel');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const { sendOrderConfirmationEmail, generateInvoicePDF } = require('../utils/nodemailer');

const createOrder = async(req, res) => {
    
    // console.log("req.user",req.user);
    try {
      const { items, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice,razorpay_order_id,totalDiscountPrice, authorised,couponCode } = req.body;
      console.log("entered",razorpay_order_id);
      if (items && items.length === 0) {
        res.status(400);
        throw new Error('No order items');
  
        // return;
      }
    
      const isCod = paymentMethod === 'cod';
      const order = new Order({
        user: req.user._id,
        items,
        shippingAddress,
        paymentResult: {
          paymentMethod: isCod ? 'cod' : 'online',
          paymentStatus: 'not-paid'
        },
        taxPrice,
        shippingPrice,
        totalPrice,
        razorpay_order_id : razorpay_order_id || "N/A",
        totalDiscountPrice : totalDiscountPrice ? totalDiscountPrice : totalPrice,
        authorised : authorised || false,
        couponCode : couponCode || null,
      });


    
      const createdOrder = await order.save();
      // Clear user's cart
      const cart = await Cart.findOne({ userId: req.user._id });

      if (cart) {
        cart.items = [];
        cart.totalItems = 0;
        cart.totalPrice = 0;
        cart.appliedCoupon = null;
        cart.updatedAt = new Date();

        await cart.save();
      }

      // Automatically send premium invoice email to COD customers immediately!
      if (createdOrder.authorised && createdOrder.paymentResult?.paymentMethod === 'cod') {
        try {
          const populatedOrder = await Order.findById(createdOrder._id).populate('user', 'firstName lastName email');
          if (populatedOrder && populatedOrder.user) {
            const userName = `${populatedOrder.user.firstName} ${populatedOrder.user.lastName}`;
            const orderDetails = {
              razorpay_order_id: "COD-" + populatedOrder._id.toString().slice(-8).toUpperCase(),
              razorpay_payment_id: "N/A (Cash on Delivery)",
              totalPrice: populatedOrder.totalPrice,
              paymentMethod: "cod",
              createdAt: populatedOrder.createdAt
            };
            await sendOrderConfirmationEmail(populatedOrder.user.email, userName, orderDetails);
            console.log("COD Order confirmation email sent successfully to", populatedOrder.user.email);
          }
        } catch (emailError) {
          console.error("Error sending COD order confirmation email:", emailError);
        }
      }

      res.status(201).json({success:true,createdOrder});
      
    } catch (error) {
      res.status(500).send({message:error.message})
    }
    
   
  }

// const getOrderById = async (req, res) => {
//   const order = await Order.findById(req.params.id).populate('user', 'name email');

//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404);
//     throw new Error('Order not found');
//   }
// }

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email firstName lastName phone')
      .populate('items.productId', 'name price brand');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateOrderToPaid = async (req, res) => {
  console.log('enterd in updateOrderToPaid');
  const {razorpay_order_id}= req.body;
  console.log("updateOrderToPaid", req.body);
  
  const order = await Order.findOne({razorpay_order_id:razorpay_order_id}).populate('user', 'firstName lastName email');
  console.log("order found",order);
  

  if (order) {
    const wasAuthorisedBefore = order.authorised;
    // order.orderStatus=req.body.orderStatus || order.orderStatus;
    // order.isPaid = true;
    // order.paidAt = Date.now();
    order.partial_payment = req.body.amount/100 == order.totalPrice ? 0 : order.partial_payment/100;
    order.authorised = req.body.authorised || order.authorised;
    order.paymentResult = {
      razorpay_payment_id:req.body.razorpay_payment_id || order.paymentResult.razorpay_payment_id,
      paymentStatus:req.body.paymentStatus || order.paymentResult.paymentStatus,
      paidAt:Date.now(),
      paymentMethod:req.body?.paymentMethod || order.paymentResult.paymentMethod,   
      upi_payment_id:req.body?.upi_payment_id || order.paymentResult.upi_payment_id,
      transaction_id:req.body?.transaction_id || order.paymentResult.transaction_id,

    };
    const updatedOrder = await order.save();
    console.log("updatedOrder",updatedOrder);

    // Decrement product stock only if the order is now successfully authorised and was not authorised before!
    if (updatedOrder.authorised && !wasAuthorisedBefore) {
      for (const item of updatedOrder.items) {
        try {
          const prodId = item.productId?._id || item.productId;
          if (prodId) {
            await Product.findByIdAndUpdate(
              prodId,
              { $inc: { stock: -item.quantity } },
              { new: true }
            );
            console.log(`Product stock decremented: ${prodId} by ${item.quantity}`);
          }
        } catch (stockError) {
          console.error(`Error decrementing stock for ${item.productId?._id || item.productId}:`, stockError);
        }
      }
    }

    // Send confirmation email to user (only if successfully paid and authorised)
    if (updatedOrder.authorised) {
      try {
        const userName = `${order.user.firstName} ${order.user.lastName}`;
        const orderDetails = {
          razorpay_order_id: updatedOrder.razorpay_order_id,
          razorpay_payment_id: updatedOrder.paymentResult.razorpay_payment_id,
          totalPrice: updatedOrder.totalPrice,
          paymentMethod: updatedOrder.paymentResult.paymentMethod,
          createdAt: updatedOrder.createdAt
        };
        
        await sendOrderConfirmationEmail(order.user.email, userName, orderDetails);
        console.log("Order confirmation email sent successfully");
      } catch (emailError) {
        console.error("Error sending order confirmation email:", emailError);
        // Don't fail the order update if email fails
      }
    }
    
    // res.status(200).json(updatedOrder);
     res.status(200).json({
      success: true,
      message: "webhook processed successfully",
 
    });

  } else {
    res.status(200).json({
      success: true,
      message: "Order not found",
    });
    
    // throw new Error('Order not found');
  }
}


const updateOrderStatus= async (req, res) => {
  const {status,id}=req.body;
  console.log(status,id);
  
  const order = await Order.findById(id);
  
  
  if (order) {
    const previousStatus = order.orderStatus;
    order.orderStatus = status;
    if(status=='delivered'){
      order.deliveredAt = Date.now();
      order.isDelivered=true;
    }

    const updatedOrder = await order.save();

    // Revert/Restore stock if changing from non-cancelled to cancelled (only if order was authorised before!)
    if (status.toLowerCase() === 'cancelled' && previousStatus.toLowerCase() !== 'cancelled' && order.authorised) {
      for (const item of updatedOrder.items) {
        try {
          const prodId = item.productId?._id || item.productId;
          if (prodId) {
            await Product.findByIdAndUpdate(
              prodId,
              { $inc: { stock: item.quantity } },
              { new: true }
            );
            console.log(`Product stock restored on cancel: ${prodId} by ${item.quantity}`);
          }
        } catch (stockError) {
          console.error(`Error restoring stock on cancel for ${item.productId?._id || item.productId}:`, stockError);
        }
      }
    }

    res.status(200).json(updatedOrder);
  } else {
    res.status(500);
    // throw new Error('Order not found');
  }
}


// const getMyOrders = async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });
//   res.json(orders);
// }

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id, authorised:true })
      .populate({
        path: 'items.productId._id',
        model: 'Product',
        select: 'images' // Only populate the images field from Product
      })
      .lean(); // Convert to plain JavaScript objects
 console.log("orders",orders);
    // Map through orders and items to add image URL to each item
    const ordersWithImages = orders.map(order => {
      const itemsWithImages = order.items.map(item => {
        console.log("orders itms",item);
        // Use the populated product data or fall back to embedded data
        const product = item.productId._id || item.productId;
        const imageUrl = product?.images?.[0]?.url || 'https://via.placeholder.com/80';
        
        return {
          ...item,
          image: imageUrl, // Add image URL to each item
          // Ensure we keep all other product data
          productId: {
            ...item.productId,
            image: imageUrl // Also add to productId for consistency
          }
        };
      });

      return {
        ...order,
        items: itemsWithImages
      };
    });

    res.json(ordersWithImages);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};


// const getAllOrders = async (req, res) => {
//   const orders = await Order.find({}).populate('user', 'id name').sort({createdAt:-1});
//   res.json(orders);
// }

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get filter parameter: 'completed' (default), 'abandoned', or 'all'
    const filterType = req.query.filter || 'completed';

    let query = {};
    if (filterType === 'completed') {
      query.authorised = true;
    } else if (filterType === 'abandoned') {
      query.authorised = false;
      query.orderStatus = { $ne: 'cancelled' };
    } else if (filterType === 'all') {
      // Return both
    }

    const orders = await Order.find(query)
      .populate('user', 'name email firstName lastName phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      orders,
      currentPage: page,
      totalPages,
      totalOrders: total
    });
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// const getOrderStatistics = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const lastWeek = new Date();
//     lastWeek.setDate(lastWeek.getDate() - 7);

//     const lastMonth = new Date();
//     lastMonth.setMonth(lastMonth.getMonth() - 1);

//     const [todayOrders, lastWeekOrders, lastMonthOrders] = await Promise.all([
//       Order.countDocuments({ createdAt: { $gte: today } }),
//       Order.countDocuments({ createdAt: { $gte: lastWeek } }),
//       Order.countDocuments({ createdAt: { $gte: lastMonth } })
//     ]);

//     res.json({
//       today: todayOrders,
//       lastWeek: lastWeekOrders,
//       lastMonth: lastMonthOrders
//     });
//   } catch (error) {
//     console.error('Error in getOrderStatistics:', error);
//     res.status(500).json({ message: 'Error fetching order statistics', error: error.message });
//   }
// };


const getOrderStatistics = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Get order counts (only authorised orders!)
    const [todayOrders, lastWeekOrders, lastMonthOrders] = await Promise.all([
      Order.countDocuments({ authorised: true, createdAt: { $gte: today } }),
      Order.countDocuments({ authorised: true, createdAt: { $gte: lastWeek } }),
      Order.countDocuments({ authorised: true, createdAt: { $gte: lastMonth } })
    ]);

    // Get sales data (only authorised orders!)
    const [todaySales, lastWeekSales, lastMonthSales] = await Promise.all([
      Order.aggregate([
        { $match: { authorised: true, createdAt: { $gte: today } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]),
      Order.aggregate([
        { $match: { authorised: true, createdAt: { $gte: lastWeek } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]),
      Order.aggregate([
        { $match: { authorised: true, createdAt: { $gte: lastMonth } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ])
    ]);

    res.json({
      orders: {
        today: todayOrders,
        lastWeek: lastWeekOrders,
        lastMonth: lastMonthOrders
      },
      sales: {
        today: todaySales[0]?.total || 0,
        lastWeek: lastWeekSales[0]?.total || 0,
        lastMonth: lastMonthSales[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Error in getOrderStatistics:', error);
    res.status(500).json({ message: 'Error fetching order statistics', error: error.message });
  }
};

// Automatic background recovery job to email abandoned checkouts
const sendAbandonedCheckoutRecoveries = async () => {
  try {
    // Find all orders that are:
    // 1. Incomplete / Unpaid: authorised is false
    // 2. Created at least 30 minutes ago (to give them time to pay)
    // 3. Created less than 48 hours ago (so it's not stale/deleted)
    // 4. Have NOT received a recovery email yet: recoveryEmailSent is not true
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const abandonedOrders = await Order.find({
      authorised: false,
      recoveryEmailSent: { $ne: true },
      createdAt: { $gte: fortyEightHoursAgo, $lte: thirtyMinutesAgo }
    }).populate('user', 'firstName lastName email');

    console.log(`[Recovery Cron] Found ${abandonedOrders.length} potential checkout drop-offs to process`);

    let sentCount = 0;
    for (const order of abandonedOrders) {
      if (order.user && order.user.email) {
        try {
          const userName = `${order.user.firstName} ${order.user.lastName}`;
          
          // Extract product names
          const productList = order.items
            ?.map(item => item.productId?.name)
            .filter(Boolean);
          
          let productDisplay = 'Ayurvedic wellness products';
          if (productList && productList.length > 0) {
            if (productList.length === 1) {
              productDisplay = `"${productList[0]}"`;
            } else if (productList.length === 2) {
              productDisplay = `"${productList[0]}" and "${productList[1]}"`;
            } else {
              productDisplay = `"${productList[0]}" and other items`;
            }
          }

          // Recovery link directing back to storefront
          const recoveryLink = `https://ayucan.com/checkout?recover=${order._id}`;
          
          const { sendCheckoutRecoveryEmail } = require('../utils/nodemailer');
          await sendCheckoutRecoveryEmail(order.user.email, userName, productDisplay, order.totalPrice, recoveryLink);
          
          // Mark recovery email as sent
          order.recoveryEmailSent = true;
          await order.save();
          
          sentCount++;
          console.log(`[Recovery Cron] Sent recovery email successfully to ${order.user.email} for order: ${order._id}`);
        } catch (emailError) {
          console.error(`[Recovery Cron] Error sending recovery email for order ${order._id}:`, emailError);
        }
      }
    }
    
    return sentCount;
  } catch (error) {
    console.error('[Recovery Cron] Critical error in recovery task:', error);
    return 0;
  }
};


// Confirm and validate an abandoned checkout, converting it into a valid Cash on Delivery (COD) order to be shipped
const confirmAbandonedOrderAsCod = async (req, res) => {
  try {
    const { id } = req.body;
    const order = await Order.findById(id).populate('user', 'firstName lastName email');
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.authorised) {
      return res.status(400).json({ message: "Order is already completed" });
    }

    const wasAuthorisedBefore = order.authorised;

    // Convert to completed COD order
    order.authorised = true;
    order.orderStatus = "Order Confirmed";
    order.paymentResult = {
      paymentMethod: "cod",
      paymentStatus: "not-paid",
      paidAt: null
    };

    const updatedOrder = await order.save();

    // Decrement product stock (since order is now authorised)
    if (updatedOrder.authorised && !wasAuthorisedBefore) {
      for (const item of updatedOrder.items) {
        try {
          const prodId = item.productId?._id || item.productId;
          if (prodId) {
            await Product.findByIdAndUpdate(
              prodId,
              { $inc: { stock: -item.quantity } },
              { new: true }
            );
            console.log(`Product stock decremented (COD recovery): ${prodId} by ${item.quantity}`);
          }
        } catch (stockError) {
          console.error(`Error decrementing stock for ${item.productId?._id || item.productId}:`, stockError);
        }
      }
    }

    // Automatically send premium invoice email to customer immediately!
    try {
      const userName = `${order.user.firstName} ${order.user.lastName}`;
      const orderDetails = {
        razorpay_order_id: "COD-" + updatedOrder._id.toString().slice(-8).toUpperCase(),
        razorpay_payment_id: "N/A (Cash on Delivery)",
        totalPrice: updatedOrder.totalPrice,
        paymentMethod: "cod",
        createdAt: updatedOrder.createdAt
      };
      await sendOrderConfirmationEmail(order.user.email, userName, orderDetails);
      console.log("COD Recovery Order confirmation email sent successfully");
    } catch (emailError) {
      console.error("Error sending recovery confirmation email:", emailError);
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm and validate an abandoned checkout, converting it into a valid PAID order (Direct customer payment)
const confirmAbandonedOrderAsPaid = async (req, res) => {
  try {
    const { id } = req.body;
    const order = await Order.findById(id).populate('user', 'firstName lastName email');
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.authorised) {
      return res.status(400).json({ message: "Order is already completed" });
    }

    const wasAuthorisedBefore = order.authorised;

    // Convert to completed Paid order (Direct payment)
    order.authorised = true;
    order.orderStatus = "Order Confirmed";
    order.paymentResult = {
      paymentMethod: "upi",
      paymentStatus: "paid",
      paidAt: Date.now()
    };

    const updatedOrder = await order.save();

    // Decrement product stock (since order is now authorised)
    if (updatedOrder.authorised && !wasAuthorisedBefore) {
      for (const item of updatedOrder.items) {
        try {
          const prodId = item.productId?._id || item.productId;
          if (prodId) {
            await Product.findByIdAndUpdate(
              prodId,
              { $inc: { stock: -item.quantity } },
              { new: true }
            );
            console.log(`Product stock decremented (Paid recovery): ${prodId} by ${item.quantity}`);
          }
        } catch (stockError) {
          console.error(`Error decrementing stock for ${item.productId?._id || item.productId}:`, stockError);
        }
      }
    }

    // Automatically send premium invoice email to customer immediately!
    try {
      const userName = `${order.user.firstName} ${order.user.lastName}`;
      const orderDetails = {
        razorpay_order_id: "DIRECT-" + updatedOrder._id.toString().slice(-8).toUpperCase(),
        razorpay_payment_id: "DIRECT-TRANSFER",
        totalPrice: updatedOrder.totalPrice,
        paymentMethod: "upi",
        createdAt: updatedOrder.createdAt
      };
      await sendOrderConfirmationEmail(order.user.email, userName, orderDetails);
      console.log("Direct Paid Recovery Order confirmation email sent successfully");
    } catch (emailError) {
      console.error("Error sending recovery confirmation email:", emailError);
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const downloadOrderInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('items.productId', 'name price');
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    const userName = `${order.user?.firstName || 'Wellness'} ${order.user?.lastName || 'Seeker'}`;
    
    // Generate PDF Buffer
    const pdfBuffer = await generateInvoicePDF(order, userName);
    
    // Compute invoice number
    const createdAt = order.createdAt || Date.now();
    const orderYear = new Date(createdAt).getFullYear();
    const rawId = order._id || order.razorpay_order_id || 'order';
    const uniqueSuffix = rawId.toString().slice(-8).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
    const invoiceNumber = `AYU-${orderYear}-${uniqueSuffix || 'XXXX'}`;
    
    // Stream response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice_${invoiceNumber}.pdf"`);
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error("Error downloading order invoice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getMyOrders,
  getAllOrders,
  getOrderStatistics,
  sendAbandonedCheckoutRecoveries,
  confirmAbandonedOrderAsCod,
  confirmAbandonedOrderAsPaid,
  downloadOrderInvoice,
};
