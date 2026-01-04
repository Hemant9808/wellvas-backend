const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    // Basic Information
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        unique: true,
        uppercase: true,
        trim: true,
        match: [/^[A-Z0-9]+$/, 'Coupon code must be alphanumeric']
    },

    type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: [true, 'Discount type is required']
    },

    value: {
        type: Number,
        required: [true, 'Discount value is required'],
        min: [0, 'Discount value must be positive']
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },

    // Applicability
    applicationType: {
        type: String,
        enum: ['all', 'products', 'categories', 'combination'],
        default: 'all',
        required: true
    },

    applicableProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],

    applicableCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],

    requiresAllProducts: {
        type: Boolean,
        default: false
    },

    // Validity
    expiryDate: {
        type: Date,
        default: null
    },

    isActive: {
        type: Boolean,
        default: true
    },

    // Usage Limits
    maxUses: {
        type: Number,
        default: 0, // 0 means unlimited
        min: 0
    },

    usedCount: {
        type: Number,
        default: 0,
        min: 0
    },

    maxUsesPerUser: {
        type: Number,
        default: 0, // 0 means unlimited
        min: 0
    },

    // Conditions
    minOrderAmount: {
        type: Number,
        default: 0,
        min: 0
    },

    // Usage History
    usageHistory: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
        usedAt: {
            type: Date,
            default: Date.now
        },
        discountAmount: {
            type: Number
        }
    }],

    // Meta
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Indexes for better query performance
couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1, expiryDate: 1 });
couponSchema.index({ applicationType: 1 });

// Virtual to check if coupon is expired
couponSchema.virtual('isExpired').get(function () {
    if (!this.expiryDate) return false;
    return new Date() > this.expiryDate;
});

// Virtual to check if usage limit reached
couponSchema.virtual('isUsageLimitReached').get(function () {
    if (this.maxUses === 0) return false;
    return this.usedCount >= this.maxUses;
});

// Method to check if valid for a specific user
couponSchema.methods.isValidForUser = function (userId) {
    if (this.maxUsesPerUser === 0) return true;

    const userUsageCount = this.usageHistory.filter(
        usage => usage.userId && usage.userId.toString() === userId.toString()
    ).length;

    return userUsageCount < this.maxUsesPerUser;
};

// Method to increment usage
couponSchema.methods.incrementUsage = function (userId, orderId, discountAmount) {
    this.usedCount += 1;
    this.usageHistory.push({
        userId,
        orderId,
        usedAt: new Date(),
        discountAmount
    });
    return this.save();
};

// Pre-save middleware to validate applicability fields
couponSchema.pre('save', function (next) {
    // Validate product-specific coupons
    if (this.applicationType === 'products' && (!this.applicableProducts || this.applicableProducts.length === 0)) {
        return next(new Error('Product-specific coupons must have at least one applicable product'));
    }

    // Validate category-specific coupons
    if (this.applicationType === 'categories' && (!this.applicableCategories || this.applicableCategories.length === 0)) {
        return next(new Error('Category-specific coupons must have at least one applicable category'));
    }

    // Validate combination coupons
    if (this.applicationType === 'combination' && (!this.applicableProducts || this.applicableProducts.length < 2)) {
        return next(new Error('Combination coupons must have at least two products'));
    }

    next();
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
