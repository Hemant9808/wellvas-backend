
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    unique:true,
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name should not exceed 50 characters'],
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory', // Referencing the Subcategory schema
    }
  ]
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;



