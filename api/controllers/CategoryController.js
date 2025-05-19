const Category = require("../models/CategoryModel");
const Subcategory = require("../models/SubcategoryModel");
const { login } = require("./AuthController");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("name");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const getSubcategory = async (req, res) => {
  try {
    console.log("entered inside");
    
    const { category } = req.params;
    console.log("category",category);
    
    const foundCategory = await Category.findOne({name:category})
    const subcategories = await Subcategory.find({ parentCategory: foundCategory._id });
    if (!subcategories || subcategories.length === 0) {
      return res
       
        .json({ message: "No subcategories found for this category" });
    }
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addOrUpdateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();

    return res
      .status(201)
      .send({ message: "Category added successfully.", newCategory });
  } catch (error) {
    console.error("Error in addOrUpdateCategory:", error);
    return res.status(500).send({ message: "Internal server error.", error });
  }
};

module.exports = { getAllCategories, addOrUpdateCategory,getSubcategory };
