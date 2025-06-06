const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactMessageSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 15,
  },
  subject: {
    type: String,
    trim: true,
    maxlength: 150,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("ContactMessage", ContactMessageSchema);
