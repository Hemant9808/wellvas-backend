const express = require('express');
const router = express.Router();
const offlineCustomerController = require('../controllers/OfflineCustomerController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

// Protect all routes - only admins can access
router.use(protect);
router.use(restrictTo('admin'));

// Customer statistics
router.get('/stats', offlineCustomerController.getCustomerStats);

// Search by phone
router.get('/search', offlineCustomerController.searchByPhone);

// Get customer purchase history
router.get('/:id/purchases', offlineCustomerController.getCustomerPurchaseHistory);

// CRUD routes
router.post('/', offlineCustomerController.createCustomer);
router.get('/', offlineCustomerController.getAllCustomers);
router.get('/:id', offlineCustomerController.getCustomerById);
router.put('/:id', offlineCustomerController.updateCustomer);
router.delete('/:id', offlineCustomerController.deleteCustomer);

module.exports = router;
