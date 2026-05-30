
const express = require('express');
const { createOrder, getAllOrders, getMyOrders, updateOrderToPaid, updateOrderStatus, getOrderStatistics, getOrderById, confirmAbandonedOrderAsCod, confirmAbandonedOrderAsPaid, downloadOrderInvoice } = require('../controllers/OrderController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router()

router.post('/createOrder',protect,createOrder);
router.post('/getAllOrders',getAllOrders);
router.get('/getMyOrders',protect,getMyOrders);
router.get('/getAllOrders',getAllOrders);
router.get('/updateOrderToPaid',updateOrderToPaid);
router.post('/updateOrderStatus/',updateOrderStatus);
router.post('/confirmAbandonedOrder',confirmAbandonedOrderAsCod);
router.post('/confirmAbandonedOrderAsPaid',confirmAbandonedOrderAsPaid);
router.get('/statistics',protect,getOrderStatistics);
router.get('/:id/invoice', downloadOrderInvoice);
//get order by id
router.get('/:id',protect,getOrderById);
 
module.exports =router;