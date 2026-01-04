const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product ID is required'],
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true,
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5'],
        },
        title: {
            type: String,
            required: [true, 'Review title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        comment: {
            type: String,
            required: [true, 'Review comment is required'],
            trim: true,
            maxlength: [1000, 'Comment cannot exceed 1000 characters'],
        },
        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                publicId: {
                    type: String,
                },
            },
        ],
        verifiedPurchase: {
            type: Boolean,
            default: false,
        },
        helpfulCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        unhelpfulCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        votes: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                type: {
                    type: String,
                    enum: ['helpful', 'unhelpful'],
                    required: true,
                },
            },
        ],
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'approved', // Auto-approve for now, can change to 'pending' if moderation needed
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to prevent duplicate reviews from same user on same product
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

// Index for querying by status
reviewSchema.index({ status: 1 });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
