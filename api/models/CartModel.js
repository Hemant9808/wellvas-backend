const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartSchema = new mongoose.Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }, 
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }, 
      price: Number, 
      quantity: Number, 
      discountPrice: Number,
      
    },
  ],
  totalItems: Number, 
  totalPrice: Number,
  discountPrice: Number,
  totalDiscountPrice: Number,
  appliedCoupon: {
    couponCode: String, 
    discountPercentage: Number, 
  },
  createdAt: Date, 
  updatedAt: Date, 
});

const Cart = mongoose.model('Cart',CartSchema)
module.exports = Cart;