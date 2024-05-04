const mongoose = require("mongoose"); // Used for MongoDB interactions

// Define the schema for the Property model
const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId, // MongoDB ObjectId type for referencing users
        ref: "User", // Reference to the User model
        required: true, // Required field
    },
    title: {
        type: String, // String type for property title
        required: true, // Required field
        minlength: 20, // Minimum length of 20 characters
    },
    city: {
        type: String, // String type for city
        enum: ["Lahore", "Islamabad", "Karachi"], // Enumerated values for city
        required: true, // Required field
    },
    desc: {
        type: String, // String type for property description
        required: true, // Required field
        minlength: 20, // Minimum length of 20 characters
    },
    img: {
        type: String, // String type for image URL
        required: true, // Required field
    },
    price: {
        type: Number, // Number type for property price
        required: true, // Required field
    },
    sqmeters: {
        type: Number, // Number type for square meters
        required: true, // Required field
    },
    country: {
        type: String, // String type for country
        enum: ["Pakistan"], // Enumerated value for country
        required: true, // Required field
    },
    beds: {
        type: Number, // Number type for number of beds
        required: true, // Required field
        min: 1, // Minimum value of 1
    },
    featured: {
        type: Boolean, // Boolean type for featured status
        required: false, // Not a required field
    }
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt fields

module.exports = mongoose.model("Property", PropertySchema); // Export the Property model
