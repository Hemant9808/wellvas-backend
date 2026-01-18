const mongoose = require('mongoose');
const { Schema } = mongoose;

const offlineInvoiceSchema = new Schema(
    {
        invoiceNumber: {
            type: String,
            required: [true, 'Invoice number is required'],
            unique: true,
            index: true
        },
        invoiceDate: {
            type: Date,
            required: [true, 'Invoice date is required'],
            default: Date.now
        },
        // Customer reference (offline customer)
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OfflineCustomer',
            index: true
        },
        // Customer details snapshot (in case customer is deleted)
        customerSnapshot: {
            name: String,
            phone: String,
            email: String,
            address: String,
            gstin: String,
            pan: String
        },
        // Items
        items: [
            {
                name: {
                    type: String,
                    required: true
                },
                description: String,
                hsn: String,
                quantity: {
                    type: Number,
                    required: true,
                    min: 0
                },
                rate: {
                    type: Number,
                    required: true,
                    min: 0
                },
                amount: {
                    type: Number,
                    required: true,
                    min: 0
                },
                // Optional: Link to product if selling from inventory
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                }
            }
        ],
        // Financial details
        subtotal: {
            type: Number,
            required: true,
            min: 0
        },
        cgst: {
            type: Number,
            default: 0,
            min: 0
        },
        sgst: {
            type: Number,
            default: 0,
            min: 0
        },
        igst: {
            type: Number,
            default: 0,
            min: 0
        },
        discount: {
            type: Number,
            default: 0,
            min: 0
        },
        total: {
            type: Number,
            required: true,
            min: 0
        },
        amountInWords: String,
        // Payment details
        paymentStatus: {
            type: String,
            enum: ['paid', 'pending', 'partial', 'cancelled'],
            default: 'pending',
            index: true
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'upi', 'card', 'netbanking', 'cheque', 'other'],
            default: 'cash'
        },
        paidAmount: {
            type: Number,
            default: 0,
            min: 0
        },
        dueAmount: {
            type: Number,
            default: 0,
            min: 0
        },
        paymentDate: Date,
        // Bank/UPI details
        bankDetails: {
            name: String,
            ifsc: String,
            account: String,
            bank: String
        },
        upiId: String,
        // Additional info
        notes: {
            type: String,
            maxlength: [500, 'Notes cannot exceed 500 characters']
        },
        termsAndConditions: String,
        // Shipping details (if applicable)
        shipTo: {
            name: String,
            address: String,
            city: String,
            state: String,
            pincode: String
        },
        // Status
        status: {
            type: String,
            enum: ['active', 'cancelled', 'returned'],
            default: 'active'
        }
    },
    {
        timestamps: true
    }
);

// Indexes
offlineInvoiceSchema.index({ invoiceDate: -1 });
offlineInvoiceSchema.index({ createdAt: -1 });
offlineInvoiceSchema.index({ total: -1 });

// Pre-save hook to calculate due amount
offlineInvoiceSchema.pre('save', function (next) {
    this.dueAmount = this.total - this.paidAmount;

    // Auto-update payment status based on amounts
    if (this.paidAmount >= this.total) {
        this.paymentStatus = 'paid';
        this.dueAmount = 0;
    } else if (this.paidAmount > 0) {
        this.paymentStatus = 'partial';
    }

    next();
});

// Static method to get next invoice number
offlineInvoiceSchema.statics.getNextInvoiceNumber = async function () {
    const lastInvoice = await this.findOne().sort({ invoiceNumber: -1 });

    if (!lastInvoice) {
        return 'INV-1';
    }

    // Extract number from last invoice (e.g., "INV-123" -> 123)
    const lastNumber = parseInt(lastInvoice.invoiceNumber.split('-')[1]) || 0;
    return `INV-${lastNumber + 1}`;
};

const OfflineInvoice = mongoose.model('OfflineInvoice', offlineInvoiceSchema);

module.exports = OfflineInvoice;
