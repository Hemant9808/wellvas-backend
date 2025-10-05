const Cart = require('../models/CartModel');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const { sendOrderConfirmationEmail } = require('../utils/nodemailer');

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
    
      const order = new Order({
        user: req.user._id,
        items,
        shippingAddress,
        paymentMethod : paymentMethod || "upi",
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

    // Send confirmation email to user
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
    order.orderStatus = status;
    if(status=='delivered'){
    order.deliveredAt = Date.now();
    order.isDelivered=true;
  }

    const updatedOrder = await order.save();
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

    //delete all orders where authorised is false
    await Order.deleteMany({authorised:false});

    const orders = await Order.find({authorised:true})
      .populate('user', 'name email firstName lastName phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments();
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

    // Get order counts
    const [todayOrders, lastWeekOrders, lastMonthOrders] = await Promise.all([
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.countDocuments({ createdAt: { $gte: lastWeek } }),
      Order.countDocuments({ createdAt: { $gte: lastMonth } })
    ]);

    // Get sales data
    const [todaySales, lastWeekSales, lastMonthSales] = await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: today } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: lastWeek } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } },
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


module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getMyOrders,
  getAllOrders,
  getOrderStatistics,
};
