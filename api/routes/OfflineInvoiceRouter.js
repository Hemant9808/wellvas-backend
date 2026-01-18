const express = require('express');
const router = express.Router();
const offlineInvoiceController = require('../controllers/OfflineInvoiceController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

// Protect all routes - only admins can access
router.use(protect);
router.use(restrictTo('admin'));

// Invoice statistics
router.get('/stats', offlineInvoiceController.getInvoiceStats);

// Get next invoice number
router.get('/next-number', offlineInvoiceController.getNextInvoiceNumber);

// Get invoice by invoice number
router.get('/number/:invoiceNumber', offlineInvoiceController.getInvoiceByNumber);

// Update payment status
router.patch('/:id/payment', offlineInvoiceController.updatePaymentStatus);

// Cancel invoice
router.patch('/:id/cancel', offlineInvoiceController.cancelInvoice);

// CRUD routes
router.post('/', offlineInvoiceController.createInvoice);
router.get('/', offlineInvoiceController.getAllInvoices);
router.get('/:id', offlineInvoiceController.getInvoiceById);
router.put('/:id', offlineInvoiceController.updateInvoice);

module.exports = router;
