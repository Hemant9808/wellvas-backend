const mongoose = require('mongoose');
const { Schema } = mongoose;

const offlineCustomerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters']
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            index: true,
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v);
                },
                message: 'Phone number must be 10 digits'
            }
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            index: true,
            validate: {
                validator: function (v) {
                    return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: 'Invalid email format'
            }
        },
        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            pincode: { type: String, trim: true },
            fullAddress: { type: String, trim: true } // For quick single-line address
        },
        gstin: {
            type: String,
            trim: true,
            uppercase: true
        },
        pan: {
            type: String,
            trim: true,
            uppercase: true
        },
        // Purchase tracking
        totalPurchases: {
            type: Number,
            default: 0,
            min: 0
        },
        totalSpent: {
            type: Number,
            default: 0,
            min: 0
        },
        lastPurchaseDate: {
            type: Date
        },
        visitCount: {
            type: Number,
            default: 0,
            min: 0
        },
        // Customer preferences and notes
        notes: {
            type: String,
            maxlength: [1000, 'Notes cannot exceed 1000 characters']
        },
        preferences: {
            type: String,
            maxlength: [500, 'Preferences cannot exceed 500 characters']
        },
        // Customer type for segmentation
        customerType: {
            type: String,
            enum: ['regular', 'wholesale', 'vip', 'new'],
            default: 'new'
        },
        // Status
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// Indexes for fast searching
offlineCustomerSchema.index({ name: 'text', phone: 'text', email: 'text' });
offlineCustomerSchema.index({ createdAt: -1 });
offlineCustomerSchema.index({ totalSpent: -1 });

// Virtual for full name display
offlineCustomerSchema.virtual('displayName').get(function () {
    return this.name;
});

// Method to update customer stats after purchase
offlineCustomerSchema.methods.recordPurchase = function (amount) {
    this.totalPurchases += 1;
    this.totalSpent += amount;
    this.lastPurchaseDate = new Date();
    this.visitCount += 1;

    // Auto-upgrade customer type based on spending
    if (this.totalSpent >= 50000) {
        this.customerType = 'vip';
    } else if (this.totalSpent >= 20000) {
        this.customerType = 'regular';
    }

    return this.save();
};

const OfflineCustomer = mongoose.model('OfflineCustomer', offlineCustomerSchema);

module.exports = OfflineCustomer;
