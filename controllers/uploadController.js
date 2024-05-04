const multer = require('multer'); // Used to handle file uploads
const uploadController = require('express').Router(); // Used to define the upload controller

// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Define the destination directory where the image will be saved
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename); // Define the filename for the saved image
    }
});

// Initialize multer with the defined storage configuration
const upload = multer({
    storage
});

// Handle POST request to upload an image
uploadController.post("/image", upload.single("image"), async (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully"); // Send a success response if the file is uploaded successfully
    } catch (error) {
        console.log(error); // Log any errors that occur during file upload
    }
});

module.exports = uploadController; // Export the upload controller
