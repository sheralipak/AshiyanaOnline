const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const authController = require('./controllers/authController');
const propertyController = require('./controllers/propertyController');
const uploadController = require('./controllers/uploadController');
const app = express();

// Database Connection Function
mongoose.set('strictQuery', false);
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Use your environment variable
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Connection error:', err);
  }
}

// Initiate Database Connection
connectToDatabase();



//routes&middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authController);
app.use("/property", propertyController)
app.use("/upload", uploadController)


// starting server
app.listen(process.env.PORT, () => console.log("Server has been started successfully "));
