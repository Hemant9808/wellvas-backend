const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubcategorySchema = new Schema({
  name: {
    unique:true,
    type: String,
    required: [true, 'Subcategory name is required'],
    trim: true,
    maxlength: [50, 'Subcategory name should not exceed 50 characters'],
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the parent category
    required: [true, 'Parent category is required'],
  }
});

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
module.exports = Subcategory;
