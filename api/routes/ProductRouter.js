const { protect } = require("../middlewares/authMiddleware");

const { addProducts, getAllProducts, getProductById, getProductByCategories, getProductBySubcategories, uploadImage, addPrescription, getAllPrescription } = require("../controllers/ProductController");
const express = require('express');
const { getAllCategories, addOrUpdateCategory } = require("../controllers/CategoryController");
const { upload } = require("../middlewares/multer.middileware");
// const protect=require("../middlewares/authMiddleware")
const router = express.Router();


router.post('/addProducts',protect,addProducts);


router.delete('/deleteProduct/:id',protect,deleteProduct);
router.get('/getProductByCategories',getProductByCategories);
router.post('/addOrUpdateCategory',addOrUpdateCategory);
router.post('/getProductBySubcategories',getProductBySubcategories);
router.post("/upload-image" ,upload.single("file"), uploadImage)
router.post("/addPrescription" ,protect, addPrescription)
router.get("/getAllPrescription" , getAllPrescription)

router.get('/getAllProducts',getAllProducts);
router.get('/getAllCategories',getAllCategories);
router.get('/getProductById/:id',getProductById);

    
module.exports=router;