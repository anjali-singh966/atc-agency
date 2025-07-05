const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (html, css, js)
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });


// Routes
const contactRoutes = require("./routes/Contact");
app.use("/api/messages", contactRoutes); // ✅ This matches your form


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

