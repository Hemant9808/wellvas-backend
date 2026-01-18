const offlineCustomerController = {};
const OfflineCustomer = require('../models/OfflineCustomerModel');
const AppError = require('../utils/error');

// Create a new offline customer
offlineCustomerController.createCustomer = async (req, res, next) => {
    try {
        const { name, phone, email, address, gstin, pan, notes, preferences, customerType } = req.body;

        // Check if customer with same phone already exists
        const existingCustomer = await OfflineCustomer.findOne({ phone });
        if (existingCustomer) {
            return next(new AppError('Customer with this phone number already exists', 400));
        }

        const customer = await OfflineCustomer.create({
            name,
            phone,
            email,
            address,
            gstin,
            pan,
            notes,
            preferences,
            customerType: customerType || 'new'
        });

        res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            customer
        });
    } catch (error) {
        console.error('Error creating offline customer:', error);
        return next(new AppError(error.message || 'Failed to create customer', 500));
    }
};

// Get all offline customers with pagination and search
offlineCustomerController.getAllCustomers = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 20,
            search = '',
            customerType,
            sortBy = '-createdAt'
        } = req.query;

        const skip = (page - 1) * limit;

        // Build query
        const query = { isActive: true };

        // Search by name, phone, or email
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by customer type
        if (customerType) {
            query.customerType = customerType;
        }

        const customers = await OfflineCustomer.find(query)
            .sort(sortBy)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await OfflineCustomer.countDocuments(query);

        res.status(200).json({
            success: true,
            customers,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        console.error('Error fetching offline customers:', error);
        return next(new AppError('Failed to fetch customers', 500));
    }
};

// Get single customer by ID
offlineCustomerController.getCustomerById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const customer = await OfflineCustomer.findById(id);

        if (!customer) {
            return next(new AppError('Customer not found', 404));
        }

        res.status(200).json({
            success: true,
            customer
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        return next(new AppError('Failed to fetch customer', 500));
    }
};

// Search customer by phone (quick lookup)
offlineCustomerController.searchByPhone = async (req, res, next) => {
    try {
        const { phone } = req.query;

        if (!phone) {
            return next(new AppError('Phone number is required', 400));
        }

        const customer = await OfflineCustomer.findOne({ phone, isActive: true });

        if (!customer) {
            return res.status(200).json({
                success: true,
                customer: null,
                message: 'No customer found with this phone number'
            });
        }

        res.status(200).json({
            success: true,
            customer
        });
    } catch (error) {
        console.error('Error searching customer:', error);
        return next(new AppError('Failed to search customer', 500));
    }
};

// Update customer
offlineCustomerController.updateCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Don't allow updating these fields directly
        delete updates.totalPurchases;
        delete updates.totalSpent;
        delete updates.visitCount;
        delete updates.lastPurchaseDate;

        const customer = await OfflineCustomer.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!customer) {
            return next(new AppError('Customer not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Customer updated successfully',
            customer
        });
    } catch (error) {
        console.error('Error updating customer:', error);
        return next(new AppError(error.message || 'Failed to update customer', 500));
    }
};

// Soft delete customer (mark as inactive)
offlineCustomerController.deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;

        const customer = await OfflineCustomer.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!customer) {
            return next(new AppError('Customer not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting customer:', error);
        return next(new AppError('Failed to delete customer', 500));
    }
};

// Get customer purchase history (invoices)
offlineCustomerController.getCustomerPurchaseHistory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const skip = (page - 1) * limit;

        const OfflineInvoice = require('../models/OfflineInvoiceModel');

        const invoices = await OfflineInvoice.find({ customerId: id })
            .sort('-invoiceDate')
            .skip(skip)
            .limit(parseInt(limit));

        const total = await OfflineInvoice.countDocuments({ customerId: id });

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
        console.error('Error fetching purchase history:', error);
        return next(new AppError('Failed to fetch purchase history', 500));
    }
};

// Get customer statistics
offlineCustomerController.getCustomerStats = async (req, res, next) => {
    try {
        const totalCustomers = await OfflineCustomer.countDocuments({ isActive: true });
        const newCustomers = await OfflineCustomer.countDocuments({
            isActive: true,
            customerType: 'new'
        });
        const vipCustomers = await OfflineCustomer.countDocuments({
            isActive: true,
            customerType: 'vip'
        });

        // Top customers by spending
        const topCustomers = await OfflineCustomer.find({ isActive: true })
            .sort('-totalSpent')
            .limit(5)
            .select('name phone totalSpent totalPurchases');

        res.status(200).json({
            success: true,
            stats: {
                total: totalCustomers,
                new: newCustomers,
                vip: vipCustomers,
                topCustomers
            }
        });
    } catch (error) {
        console.error('Error fetching customer stats:', error);
        return next(new AppError('Failed to fetch customer statistics', 500));
    }
};

module.exports = offlineCustomerController;
