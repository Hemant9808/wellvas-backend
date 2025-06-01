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
    const { name ,_id} = req.body;
    if(_id){
      const updatedCategory = await Category.findByIdAndUpdate(_id, { name }, { new: true });
      return res.status(200).json({ message: "Category updated successfully.", updatedCategory });
    }
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


const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete associated subcategories
    await Subcategory.deleteMany({ parentCategory: id });

    // Delete the category
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category and its subcategories deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { getAllCategories, addOrUpdateCategory,getSubcategory,deleteCategory };
