
const express = require('express');
const { submitContactForm, getAllMessages } = require('../controllers/ContactController');

const router = express.Router()

router.post('/saveMessage',submitContactForm);
router.get("/getAllMessages", getAllMessages);
 
module.exports =router;