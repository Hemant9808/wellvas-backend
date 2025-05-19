
const express = require('express');
const { createOrder, getAllOrders, getMyOrders, updateOrderToPaid, updateOrderStatus } = require('../controllers/OrderController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router()

router.post('/createOrder',protect,createOrder);
router.post('/getAllOrders',getAllOrders);
router.get('/getMyOrders',protect,getMyOrders);
 router.get('/getAllOrders',getAllOrders);
 router.get('/updateOrderToPaid',updateOrderToPaid);
 router.post('/updateOrderStatus/',updateOrderStatus);
 
module.exports =router;