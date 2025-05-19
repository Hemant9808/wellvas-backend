const Cart = require('../models/CartModel');
const Order = require('../models/OrderModel');

const createOrder = async(req, res) => {
    
    // console.log("req.user",req.user);
    try {
      const { items, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice,razorpay_order_id } = req.body;
      console.log("entered",razorpay_order_id);
      if (items && items.length === 0) {
        res.status(400);
        throw new Error('No order items');
  
        return;
      }
    
      const order = new Order({
        user: req.user._id,
        items,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
        razorpay_order_id
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

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}


const updateOrderToPaid = async (req, res) => {
  console.log('enterd in updateOrderToPaid');
  const {razorpay_order_id}= req.body;
  console.log("updateOrderToPaid", req.body);
  
  const order = await Order.findOne({razorpay_order_id:razorpay_order_id});
  console.log("order found",order);
  

  if (order) {
    order.orderStatus=req.body.orderStatus || order.orderStatus;
    // order.isPaid = true;
    // order.paidAt = Date.now();
    order.paymentResult = {
      razorpay_payment_id:req.body.razorpay_payment_id || order.paymentResult.razorpay_payment_id,
      paymentStatus:req.body.paymentStatus || order.paymentResult.paymentStatus,
      paidAt:Date.now(),
      paymentMethod:req.body.paymentMethod || order.paymentResult.paymentMethod,     
    };
    const updatedOrder = await order.save();
    console.log("updatedOrder",updatedOrder);

    
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
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


const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
}


const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name').sort({createdAt:-1});
  res.json(orders);
}

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getMyOrders,
  getAllOrders,
};
