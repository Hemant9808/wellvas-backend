const { addToCart, rtremoveItemFromCart, getUserCart } = require("../controllers/CartController");
const { getAllOrders, getMyOrders } = require("../controllers/OrderController");
const { protect } = require("../middlewares/authMiddleware");
const express = require('express')
const router = express.Router();
 router.post('/addToCart',protect,addToCart);
 router.delete('/removeItemFromCart/:productId',protect,removeItemFromCart);
 router.get('/getUserCart',protect,getUserCart);
 






 module.exports= router