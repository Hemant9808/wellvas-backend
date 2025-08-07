const mongoose = require("mongoose");
const { Schema } = mongoose;
// Interface for TypeScript type safety

// Mongoose Schema
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Medicine name is required"],
      trim: true,
      maxlength: [100, "Medicine name should not exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Medicine description is required"],
      maxlength: [
        2000,
        "Medicine description should not exceed 2000 characters",
      ],
    },
    price: {
      type: Number,
      required: [true, "Medicine price is required"],
      min: [0, "Price cannot be negative"],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Referencing the Category schema
        required: [true, "At least one category is required"],
        index: true, // Index for better query performance
      },
    ],
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory", // Referencing the Subcategory schema
        required: [false, "Subcategory is optional"], // Can be optional if subcategories are not always needed
      },
    ],
    brand: {
      type: String,
      required: [true, "Medicine brand is required"],
    },
    manufacturer: {
      type: String,
      required: [true, "Manufacturer is required"],
  },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    images: [
      {
        url: {
          type: String,
          required: [true, "Image URL is required"],
        },
      },
    ],
    isFeatured :{
      type: Boolean,
      default: false, // Default value for isFeatured
    },
    isBestSelling :{
      type: Boolean,
      default: false, // Default value for isBestSelling
    },
    discountPrice: {
      type: Number,
     
      min: [0, "Discount price cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
