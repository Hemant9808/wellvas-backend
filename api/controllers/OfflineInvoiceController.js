const offlineInvoiceController = {};
const OfflineInvoice = require('../models/OfflineInvoiceModel');
const OfflineCustomer = require('../models/OfflineCustomerModel');
const Product = require('../models/ProductModel');
const AppError = require('../utils/error');

// Create a new invoice
offlineInvoiceController.createInvoice = async (req, res, next) => {
    try {
        const {
            invoiceNumber,
            invoiceDate,
            customerId,
            customerSnapshot,
            items,
            subtotal,
            cgst,
            sgst,
            igst,
            discount,
            total,
            amountInWords,
            paymentStatus,
            paymentMethod,
            paidAmount,
            notes,
            shipTo,
            bankDetails,
            upiId
        } = req.body;

        // Validate invoice number is unique
        if (invoiceNumber) {
            const existing = await OfflineInvoice.findOne({ invoiceNumber });
            if (existing) {
                return next(new AppError('Invoice number already exists', 400));
            }
        }

        // If customer ID provided, get customer snapshot
        let customerData = customerSnapshot;
        if (customerId) {
            const customer = await OfflineCustomer.findById(customerId);
            if (customer) {
                customerData = {
                    name: customer.name,
                    phone: customer.phone,
                    email: customer.email,
                    address: customer.address?.fullAddress || '',
                    gstin: customer.gstin,
                    pan: customer.pan
                };
            }
        }

        // Create invoice
        const invoice = await OfflineInvoice.create({
            invoiceNumber: invoiceNumber || await OfflineInvoice.getNextInvoiceNumber(),
            invoiceDate: invoiceDate || new Date(),
            customerId,
            customerSnapshot: customerData,
            items,
            subtotal,
            cgst,
            sgst,
            igst,
            discount,
            total,
            amountInWords,
            paymentStatus: paymentStatus || 'pending',
            paymentMethod: paymentMethod || 'cash',
            paidAmount: paidAmount || 0,
            notes,
            shipTo,
            bankDetails,
            upiId
        });

        // Update customer purchase stats if customer linked
        if (customerId) {
            try {
                const customer = await OfflineCustomer.findById(customerId);
                if (customer) {
                    await customer.recordPurchase(total);
                }
            } catch (error) {
                console.error('Error updating customer stats:', error);
                // Don't fail the invoice creation if customer update fails
            }
        }

        // Update product inventory if products linked
        for (const item of items) {
            if (item.productId) {
                try {
                    await Product.findByIdAndUpdate(item.productId, {
                        $inc: { stock: -item.quantity }
                    });
                } catch (error) {
                    console.error('Error updating product stock:', error);
                }
            }
        }

        res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            invoice
        });
    } catch (error) {
        console.error('Error creating invoice:', error);
        return next(new AppError(error.message || 'Failed to create invoice', 500));
    }
};

// Get all invoices with pagination and filters
offlineInvoiceController.getAllInvoices = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 20,
            paymentStatus,
            customerId,
            startDate,
            endDate,
            search
        } = req.query;

        const skip = (page - 1) * limit;

        // Build query
        const query = { status: 'active' };

        if (paymentStatus) query.paymentStatus = paymentStatus;
        if (customerId) query.customerId = customerId;

        // Date range filter
        if (startDate || endDate) {
            query.invoiceDate = {};
            if (startDate) query.invoiceDate.$gte = new Date(startDate);
            if (endDate) query.invoiceDate.$lte = new Date(endDate);
        }

        // Search by invoice number or customer name
        if (search) {
            query.$or = [
                { invoiceNumber: { $regex: search, $options: 'i' } },
                { 'customerSnapshot.name': { $regex: search, $options: 'i' } },
                { 'customerSnapshot.phone': { $regex: search, $options: 'i' } }
            ];
        }

        const invoices = await OfflineInvoice.find(query)
            .populate('customerId', 'name phone email')
            .sort('-invoiceDate')
            .skip(skip)
            .limit(parseInt(limit));

        const total = await OfflineInvoice.countDocuments(query);

        res.status(200).json({
            success: true,
            invoices,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return next(new AppError('Failed to fetch invoices', 500));
    }
};

// Get single invoice by ID
offlineInvoiceController.getInvoiceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const invoice = await OfflineInvoice.findById(id)
            .populate('customerId', 'name phone email address');

        if (!invoice) {
            return next(new AppError('Invoice not found', 404));
        }

        res.status(200).json({
            success: true,
            invoice
        });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        return next(new AppError('Failed to fetch invoice', 500));
    }
};

// Get invoice by invoice number
offlineInvoiceController.getInvoiceByNumber = async (req, res, next) => {
    try {
        const { invoiceNumber } = req.params;

        const invoice = await OfflineInvoice.findOne({ invoiceNumber })
            .populate('customerId', 'name phone email address');

        if (!invoice) {
            return next(new AppError('Invoice not found', 404));
        }

        res.status(200).json({
            success: true,
            invoice
        });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        return next(new AppError('Failed to fetch invoice', 500));
    }
};

// Update payment status
offlineInvoiceController.updatePaymentStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { paymentStatus, paidAmount, paymentMethod, paymentDate } = req.body;

        const invoice = await OfflineInvoice.findById(id);

        if (!invoice) {
            return next(new AppError('Invoice not found', 404));
        }

        if (paymentStatus) invoice.paymentStatus = paymentStatus;
        if (paidAmount !== undefined) invoice.paidAmount = paidAmount;
        if (paymentMethod) invoice.paymentMethod = paymentMethod;
        if (paymentDate) invoice.paymentDate = paymentDate;

        await invoice.save();

        res.status(200).json({
            success: true,
            message: 'Payment status updated successfully',
            invoice
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
        return next(new AppError('Failed to update payment status', 500));
    }
};

// Update invoice
offlineInvoiceController.updateInvoice = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const invoice = await OfflineInvoice.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!invoice) {
            return next(new AppError('Invoice not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Invoice updated successfully',
            invoice
        });
    } catch (error) {
        console.error('Error updating invoice:', error);
        return next(new AppError('Failed to update invoice', 500));
    }
};

// Cancel invoice
offlineInvoiceController.cancelInvoice = async (req, res, next) => {
    try {
        const { id } = req.params;

        const invoice = await OfflineInvoice.findByIdAndUpdate(
            id,
            { status: 'cancelled', paymentStatus: 'cancelled' },
            { new: true }
        );

        if (!invoice) {
            return next(new AppError('Invoice not found', 404));
        }

        // Revert inventory if products were linked
        for (const item of invoice.items) {
            if (item.productId) {
                try {
                    await Product.findByIdAndUpdate(item.productId, {
                        $inc: { stock: item.quantity }
                    });
                } catch (error) {
                    console.error('Error reverting product stock:', error);
                }
            }
        }

        res.status(200).json({
            success: true,
            message: 'Invoice cancelled successfully',
            invoice
        });
    } catch (error) {
        console.error('Error cancelling invoice:', error);
        return next(new AppError('Failed to cancel invoice', 500));
    }
};

// Get next invoice number
offlineInvoiceController.getNextInvoiceNumber = async (req, res, next) => {
    try {
        const nextNumber = await OfflineInvoice.getNextInvoiceNumber();

        res.status(200).json({
            success: true,
            invoiceNumber: nextNumber
        });
    } catch (error) {
        console.error('Error getting next invoice number:', error);
        return next(new AppError('Failed to get next invoice number', 500));
    }
};

// Get invoice statistics
offlineInvoiceController.getInvoiceStats = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        const dateQuery = {};
        if (startDate || endDate) {
            dateQuery.invoiceDate = {};
            if (startDate) dateQuery.invoiceDate.$gte = new Date(startDate);
            if (endDate) dateQuery.invoiceDate.$lte = new Date(endDate);
        }

        const totalInvoices = await OfflineInvoice.countDocuments({ ...dateQuery, status: 'active' });
        const paidInvoices = await OfflineInvoice.countDocuments({ ...dateQuery, paymentStatus: 'paid', status: 'active' });
        const pendingInvoices = await OfflineInvoice.countDocuments({ ...dateQuery, paymentStatus: 'pending', status: 'active' });

        // Calculate total revenue
        const revenueData = await OfflineInvoice.aggregate([
            { $match: { ...dateQuery, status: 'active' } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$total' },
                    paidRevenue: {
                        $sum: {
                            $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$total', 0]
                        }
                    },
                    pendingRevenue: {
                        $sum: {
                            $cond: [{ $eq: ['$paymentStatus', 'pending'] }, '$total', 0]
                        }
                    }
                }
            }
        ]);

        const revenue = revenueData[0] || {
            totalRevenue: 0,
            paidRevenue: 0,
            pendingRevenue: 0
        };

        res.status(200).json({
            success: true,
            stats: {
                invoices: {
                    total: totalInvoices,
                    paid: paidInvoices,
                    pending: pendingInvoices
                },
                revenue
            }
        });
    } catch (error) {
        console.error('Error fetching invoice stats:', error);
        return next(new AppError('Failed to fetch invoice statistics', 500));
    }
};

module.exports = offlineInvoiceController;
