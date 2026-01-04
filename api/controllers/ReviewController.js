const reviewController = {};
const Review = require('../models/ReviewModel');
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');
const AppError = require('../utils/error');

// Create a new review
reviewController.createReview = async (req, res, next) => {
    try {
        const { productId, rating, title, comment, images } = req.body;
        const userId = req.user._id;

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({ productId, userId });
        if (existingReview) {
            return next(new AppError('You have already reviewed this product', 400));
        }

        // Check if user purchased this product (for verified purchase badge)
        const hasPurchased = await Order.findOne({
            userId,
            'products.productId': productId,
            status: 'delivered', // Only delivered orders count
        });

        // Create review
        const review = await Review.create({
            productId,
            userId,
            rating,
            title,
            comment,
            images: images || [],
            verifiedPurchase: !!hasPurchased,
        });

        // Update product average rating
        await updateProductRating(productId);

        // Populate user details
        await review.populate('userId', 'firstName lastName userName');

        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            review,
        });
    } catch (error) {
        console.error('Error creating review:', error);
        return next(new AppError('Failed to create review', 500));
    }
};

// Get all reviews for a product
reviewController.getProductReviews = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

        const skip = (page - 1) * limit;

        const reviews = await Review.find({
            productId,
            status: 'approved'
        })
            .populate('userId', 'firstName lastName userName')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Review.countDocuments({
            productId,
            status: 'approved'
        });

        res.status(200).json({
            success: true,
            reviews,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total,
            },
        });
    } catch (error) {
        console.error('Error getting product reviews:', error);
        return next(new AppError('Failed to get reviews', 500));
    }
};

// Get reviews by user
reviewController.getUserReviews = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10 } = req.query;

        const skip = (page - 1) * limit;

        const reviews = await Review.find({ userId })
            .populate('productId', 'name images price')
            .sort('-createdAt')
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Review.countDocuments({ userId });

        res.status(200).json({
            success: true,
            reviews,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total,
            },
        });
    } catch (error) {
        console.error('Error getting user reviews:', error);
        return next(new AppError('Failed to get reviews', 500));
    }
};

// Update review (user can only update their own)
reviewController.updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { rating, title, comment, images } = req.body;

        const review = await Review.findById(id);

        if (!review) {
            return next(new AppError('Review not found', 404));
        }

        // Check ownership
        if (review.userId.toString() !== userId.toString()) {
            return next(new AppError('You can only update your own reviews', 403));
        }

        // Update fields
        if (rating) review.rating = rating;
        if (title) review.title = title;
        if (comment) review.comment = comment;
        if (images) review.images = images;

        await review.save();

        // Update product average rating if rating changed
        if (rating) {
            await updateProductRating(review.productId);
        }

        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            review,
        });
    } catch (error) {
        console.error('Error updating review:', error);
        return next(new AppError('Failed to update review', 500));
    }
};

// Delete review (user can delete their own, admin can delete any)
reviewController.deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const isAdmin = req.user.role === 'admin';

        const review = await Review.findById(id);

        if (!review) {
            return next(new AppError('Review not found', 404));
        }

        // Check permissions
        const isOwner = review.userId.toString() === userId.toString();
        if (!isOwner && !isAdmin) {
            return next(new AppError('You do not have permission to delete this review', 403));
        }

        const productId = review.productId;
        await Review.findByIdAndDelete(id);

        // Update product average rating
        await updateProductRating(productId);

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        return next(new AppError('Failed to delete review', 500));
    }
};

// Vote on review (helpful/unhelpful)
reviewController.voteReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { type } = req.body; // 'helpful' or 'unhelpful'
        const userId = req.user._id;

        if (!['helpful', 'unhelpful'].includes(type)) {
            return next(new AppError('Invalid vote type', 400));
        }

        const review = await Review.findById(id);

        if (!review) {
            return next(new AppError('Review not found', 404));
        }

        // Can't vote on own review
        if (review.userId.toString() === userId.toString()) {
            return next(new AppError('You cannot vote on your own review', 400));
        }

        // Check if user already voted
        const existingVote = review.votes.find(
            v => v.userId.toString() === userId.toString()
        );

        if (existingVote) {
            // If voting the same way, remove vote
            if (existingVote.type === type) {
                review.votes = review.votes.filter(
                    v => v.userId.toString() !== userId.toString()
                );
                review[`${type}Count`] -= 1;
            } else {
                // Change vote
                review[`${existingVote.type}Count`] -= 1;
                review[`${type}Count`] += 1;
                existingVote.type = type;
            }
        } else {
            // New vote
            review.votes.push({ userId, type });
            review[`${type}Count`] += 1;
        }

        await review.save();

        res.status(200).json({
            success: true,
            message: 'Vote recorded successfully',
            helpfulCount: review.helpfulCount,
            unhelpfulCount: review.unhelpfulCount,
        });
    } catch (error) {
        console.error('Error voting on review:', error);
        return next(new AppError('Failed to record vote', 500));
    }
};

// Helper function to update product average rating
async function updateProductRating(productId) {
    try {
        const reviews = await Review.find({
            productId,
            status: 'approved'
        });

        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0;

        await Product.findByIdAndUpdate(productId, {
            averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
            totalReviews,
        });
    } catch (error) {
        console.error('Error updating product rating:', error);
    }
}

// Admin: Get all reviews
reviewController.getAllReviews = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, status, productId } = req.query;
        const skip = (page - 1) * limit;

        const filter = {};
        if (status) filter.status = status;
        if (productId) filter.productId = productId;

        const reviews = await Review.find(filter)
            .populate('userId', 'firstName lastName userName email')
            .populate('productId', 'name images')
            .sort('-createdAt')
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Review.countDocuments(filter);

        res.status(200).json({
            success: true,
            reviews,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total,
            },
        });
    } catch (error) {
        console.error('Error getting all reviews:', error);
        return next(new AppError('Failed to get reviews', 500));
    }
};

// Admin: Approve review
reviewController.approveReview = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await Review.findByIdAndUpdate(
            id,
            { status: 'approved' },
            { new: true }
        );

        if (!review) {
            return next(new AppError('Review not found', 404));
        }

        // Update product rating
        await updateProductRating(review.productId);

        res.status(200).json({
            success: true,
            message: 'Review approved successfully',
            review,
        });
    } catch (error) {
        console.error('Error approving review:', error);
        return next(new AppError('Failed to approve review', 500));
    }
};

// Admin: Reject review
reviewController.rejectReview = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await Review.findByIdAndUpdate(
            id,
            { status: 'rejected' },
            { new: true }
        );

        if (!review) {
            return next(new AppError('Review not found', 404));
        }

        // Update product rating
        await updateProductRating(review.productId);

        res.status(200).json({
            success: true,
            message: 'Review rejected successfully',
            review,
        });
    } catch (error) {
        console.error('Error rejecting review:', error);
        return next(new AppError('Failed to reject review', 500));
    }
};

module.exports = reviewController;
