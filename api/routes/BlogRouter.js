const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/PostController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const router = express.Router();

// Public routes
router.get('/getPosts', getAllPosts);
router.get('/getPost/:id', getPostById);

// Protected routes - Admin only
router.post('/addPost', protect, restrictTo('admin'), createPost);
router.put('/updatePost/:id', protect, restrictTo('admin'), updatePost);
router.delete('/deletePost/:id', protect, restrictTo('admin'), deletePost);

module.exports = router;
