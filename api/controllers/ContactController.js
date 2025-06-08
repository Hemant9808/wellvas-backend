const ContactMessageModel = require("../models/ContactMessageModel");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    console.log("Received contact form data:", req.body);

    const newMessage = new ContactMessageModel({
      name,
      email,
      phone,
    subject,
      message,
    });

    await newMessage.save();

    res.status(200).json({ message: "Your message has been received!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessageModel.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contact messages" });
  }
};