const AppError = require('../utils/error');

// Admin middleware - checks if user has admin role
const adminMiddleware = (req, res, next) => {
    // User should already be authenticated (protect middleware runs first)
    if (!req.user) {
        return next(new AppError('Authentication required', 401));
    }

    // Check if user has admin role
    if (req.user.role !== 'admin') {
        return next(new AppError('Access denied. Admin privileges required.', 403));
    }

    next();
};

module.exports = adminMiddleware;
