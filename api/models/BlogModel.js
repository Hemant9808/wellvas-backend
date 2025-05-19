const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  mainImg: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  secondaryImg: {
    type: [String], // Array of strings
    default: [],
  },
  secondaryDesc: {
    type: String,
    required: true,
  },
  content: {
    type: String, // Optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
