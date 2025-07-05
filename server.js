const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const Contact = require('./models/contact');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // serves your HTML, CSS, JS

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed', err));

// Route for contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
