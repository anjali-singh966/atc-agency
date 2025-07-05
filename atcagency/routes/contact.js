// routes/contact.js

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// ✅ This is the correct import
const Contact = require("../models/contact");


// POST /api/messages
router.post("/", async (req, res) => {
  try {
    console.log("📨 Received:", req.body);  // ✅ Log input from frontend

    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("❌ Error saving message:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
