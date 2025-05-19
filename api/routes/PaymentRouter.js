const express = require('express');
const { getKey, paymentVerification, checkout } = require('../controllers/PaymentController');

const router = express.Router();

router.post("/checkout",checkout);
router.get("/getKey",getKey);


router.post("/paymentverification",paymentVerification);

module.exports= router;
