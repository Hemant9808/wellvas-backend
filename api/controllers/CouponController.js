const Coupon = require('../models/CouponModel');
const Product = require('../models/ProductModel');
const AppError = require('../utils/error');

// Helper function to calculate discount
const calculateDiscount = (amount, value, type) => {
    if (type === 'percentage') {
        return (amount * value) / 100;
    }
    return Math.min(value, amount); // Fixed discount, but not more than cart total
};

// Create a new coupon (Admin only)
exports.createCoupon = async (req, res, next) => {
    try {
        const couponData = {
            ...req.body,
            createdBy: req.user._id
        };

        const coupon = await Coupon.create(couponData);

        res.status(201).json({
            success: true,
            message: 'Coupon created successfully',
            coupon
        });
    } catch (error) {
        next(error);
    }
};

// Get all coupons (Admin only)
exports.getAllCoupons = async (req, res, next) => {
    try {
        const { status, applicationType, search, page = 1, limit = 20 } = req.query;

        const query = {};

        // Filter by status
        if (status === 'active') {
            query.isActive = true;
            query.$or = [
                { expiryDate: null },
                { expiryDate: { $gt: new Date() } }
            ];
        } else if (status === 'inactive') {
            query.isActive = false;
        } else if (status === 'expired') {
            query.expiryDate = { $lte: new Date() };
        }

        // Filter by application type
        if (applicationType) {
            query.applicationType = applicationType;
        }

        // Search by code or description
        if (search) {
            query.$or = [
                { code: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const [coupons, total] = await Promise.all([
            Coupon.find(query)
                .populate('applicableProducts', 'name images')
                .populate('applicableCategories', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Coupon.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            coupons,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get coupon by ID (Admin only)
exports.getCouponById = async (req, res, next) => {
    try {
        const coupon = await Coupon.findById(req.params.id)
            .populate('applicableProducts', 'name images')
            .populate('applicableCategories', 'name')
            .populate('usageHistory.userId', 'firstName lastName email')
            .populate('usageHistory.orderId', 'orderNumber');

        if (!coupon) {
            return next(new AppError('Coupon not found', 404));
        }

        res.status(200).json({
            success: true,
            coupon
        });
    } catch (error) {
        next(error);
    }
};

// Update coupon (Admin only)
exports.updateCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!coupon) {
            return next(new AppError('Coupon not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Coupon updated successfully',
            coupon
        });
    } catch (error) {
        next(error);
    }
};

// Delete coupon (Admin only)
exports.deleteCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);

        if (!coupon) {
            return next(new AppError('Coupon not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Coupon deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Toggle coupon active status (Admin only)
exports.toggleCouponStatus = async (req, res, next) => {
    try {
        const coupon = await Coupon.findById(req.params.id);

        if (!coupon) {
            return next(new AppError('Coupon not found', 404));
        }

        coupon.isActive = !coupon.isActive;
        await coupon.save();

        res.status(200).json({
            success: true,
            message: `Coupon ${coupon.isActive ? 'activated' : 'deactivated'} successfully`,
            coupon
        });
    } catch (error) {
        next(error);
    }
};

// Validate and apply coupon (User)
exports.validateCoupon = async (req, res, next) => {
    try {
        const { code, cart, userId } = req.body;

        if (!code || !cart || cart.length === 0) {
            return next(new AppError('Coupon code and cart items are required', 400));
        }

        // Find coupon
        const coupon = await Coupon.findOne({ code: code.toUpperCase() })
            .populate('applicableProducts', 'name price category')
            .populate('applicableCategories', 'name');

        if (!coupon) {
            return next(new AppError('Invalid coupon code', 404));
        }

        // Check if active
        if (!coupon.isActive) {
            return next(new AppError('This coupon is no longer active', 400));
        }

        // Check if expired
        if (coupon.isExpired) {
            return next(new AppError('This coupon has expired', 400));
        }

        // Check usage limit
        if (coupon.isUsageLimitReached) {
            return next(new AppError('Coupon usage limit has been reached', 400));
        }

        // Check per-user usage limit
        if (userId && !coupon.isValidForUser(userId)) {
            return next(new AppError('You have already used this coupon the maximum number of times', 400));
        }

        // Calculate cart total
        const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Check minimum order amount
        if (cartTotal < coupon.minOrderAmount) {
            return next(new AppError(`Minimum order amount of ₹${coupon.minOrderAmount} required`, 400));
        }

        let eligibleItems = [];
        let eligibleTotal = 0;
        let discount = 0;

        // Apply coupon based on type
        switch (coupon.applicationType) {
            case 'all':
                eligibleItems = cart;
                eligibleTotal = cartTotal;
                discount = calculateDiscount(eligibleTotal, coupon.value, coupon.type);
                break;

            case 'products':
                eligibleItems = cart.filter(item =>
                    coupon.applicableProducts.some(p => p._id.toString() === item.productId.toString())
                );

                if (eligibleItems.length === 0) {
                    const productNames = coupon.applicableProducts.map(p => p.name).join(', ');
                    return next(new AppError(`This coupon is only valid for: ${productNames}`, 400));
                }

                eligibleTotal = eligibleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                discount = calculateDiscount(eligibleTotal, coupon.value, coupon.type);
                break;

            case 'categories':
                eligibleItems = cart.filter(item => {
                    const product = coupon.applicableProducts.find(p => p._id.toString() === item.productId.toString());
                    return product && coupon.applicableCategories.some(c => c._id.toString() === product.category.toString());
                });

                if (eligibleItems.length === 0) {
                    const categoryNames = coupon.applicableCategories.map(c => c.name).join(', ');
                    return next(new AppError(`This coupon is only valid for ${categoryNames} products`, 400));
                }

                eligibleTotal = eligibleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                discount = calculateDiscount(eligibleTotal, coupon.value, coupon.type);
                break;

            case 'combination':
                const cartProductIds = cart.map(item => item.productId.toString());
                const requiredProductIds = coupon.applicableProducts.map(p => p._id.toString());

                if (coupon.requiresAllProducts) {
                    // All products must be in cart
                    const hasAllProducts = requiredProductIds.every(pid => cartProductIds.includes(pid));
                    if (!hasAllProducts) {
                        const productNames = coupon.applicableProducts.map(p => p.name).join(' + ');
                        return next(new AppError(`You need all of these products in cart: ${productNames}`, 400));
                    }
                } else {
                    // At least one product must be in cart
                    const hasAnyProduct = requiredProductIds.some(pid => cartProductIds.includes(pid));
                    if (!hasAnyProduct) {
                        const productNames = coupon.applicableProducts.map(p => p.name).join(' or ');
                        return next(new AppError(`Add one of these products to cart: ${productNames}`, 400));
                    }
                }

                eligibleItems = cart.filter(item =>
                    requiredProductIds.includes(item.productId.toString())
                );
                eligibleTotal = eligibleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                discount = calculateDiscount(eligibleTotal, coupon.value, coupon.type);
                break;

            default:
                return next(new AppError('Invalid coupon type', 400));
        }

        // Round discount to 2 decimal places
        discount = Math.round(discount * 100) / 100;

        res.status(200).json({
            success: true,
            message: 'Coupon applied successfully',
            coupon: {
                code: coupon.code,
                type: coupon.type,
                value: coupon.value,
                description: coupon.description,
                applicationType: coupon.applicationType
            },
            discount,
            eligibleTotal,
            finalTotal: Math.max(0, cartTotal - discount),
            eligibleItems: eligibleItems.map(item => ({
                productId: item.productId,
                productName: item.name,
                quantity: item.quantity
            }))
        });
    } catch (error) {
        next(error);
    }
};

// Get coupon statistics (Admin only)
exports.getCouponStats = async (req, res, next) => {
    try {
        const [totalCoupons, activeCoupons, totalUsage, totalDiscount] = await Promise.all([
            Coupon.countDocuments(),
            Coupon.countDocuments({ isActive: true }),
            Coupon.aggregate([
                { $group: { _id: null, total: { $sum: '$usedCount' } } }
            ]),
            Coupon.aggregate([
                { $unwind: '$usageHistory' },
                { $group: { _id: null, total: { $sum: '$usageHistory.discountAmount' } } }
            ])
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalCoupons,
                activeCoupons,
                totalUsage: totalUsage[0]?.total || 0,
                totalDiscountGiven: Math.round((totalDiscount[0]?.total || 0) * 100) / 100
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = exports;
