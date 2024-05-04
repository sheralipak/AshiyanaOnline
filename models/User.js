const mongoose = require("mongoose"); // Used for MongoDB interactions

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    username: {
        type: String, // String type for username
        required: true, // Required field
        unique: true, // Unique constraint
    },
    email: {
        type: String, // String type for email
        required: true, // Required field
        unique: true, // Unique constraint
    },
    password: {
        type: String, // String type for password
        required: true, // Required field
        minlength: 6, // Minimum length of 6 characters
    },
    profileImg: {
        type: String, // String type for profile image URL
        default: "", // Default value is an empty string
    }
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt fields

module.exports = mongoose.model("User", UserSchema); // Export the User model
