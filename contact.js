const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Message = mongoose.model("Message", MessageSchema);

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    console.log("📩 Message saved");
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("❌ Error saving message:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
