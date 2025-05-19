// const { protect } = require("../middlewares/authMiddleware");

const express = require('express');
const { getAllCategories, addOrUpdateCategory, getSubcategory } = require("../controllers/CategoryController");
// const protect=require("../middlewares/authMiddleware")
const router = express.Router();


router.get('/getAllCategories',getAllCategories);
router.post('/addOrUpdateCategory',addOrUpdateCategory);
router.get('/fetchSubcategories/:category',getSubcategory);

module.exports=router;