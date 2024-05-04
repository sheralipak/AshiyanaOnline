const Property = require('../models/Property'); // Used to import the Property model
const propertyController = require('express').Router(); // Used to define the property controller
const verifyToken = require("../middlewares/verifyToken"); // Used to verify the user's token

// get all properties
propertyController.get('/getAll', async (req, res) => { // Used to handle getting all properties
    try {
        const properties = await Property.find({}); // Used to find all properties in the database
        return res.status(200).json(properties); // Used to send the found properties as a response
    } catch (error) {
        return res.status(500).json(error.message); // Used to handle errors
    }
});

// get featured properties
propertyController.get('/find/featured', async (req, res) => { // Used to handle getting featured properties
    try {
        const featuredProperties = await Property.find({ featured: true }).populate('currentOwner', '-password'); // Used to find featured properties and populate the currentOwner field
        return res.status(200).json(featuredProperties); // Used to send the found featured properties as a response
    } catch (error) {
        return res.status(500).json(error.message); // Used to handle errors
    }
});

// get all properties from a specific city
propertyController.get('/find', async (req, res) => { // Used to handle getting properties from a specific city http://localhost:5000/property/find?city=Karachi
    try {
        console.log("Query Parameters:", req.query); // Log the query parameters
        const { city } = req.query; // Extract the city value from req.query
        console.log("City:", city); // Log the received city value
        if (city) {
            const properties = await Property.find({ city }).populate('currentOwner', '-password'); // Used to find properties from the specified city and populate the currentOwner field
            console.log("Properties:", properties); // Log the fetched properties
            return res.status(200).json(properties); // Used to send the found properties as a response
        } else {
            return res.status(400).json({ msg: "No city specified" }); // Used to send a 400 status for bad request if no city is specified
        }
    } catch (error) {
        console.error("Error:", error); // Log any caught errors
        return res.status(500).json(error.message); // Used to handle errors
    }
});

// get counts of properties by city
propertyController.get('/find/countByCity', async (req, res) => { // Used to handle getting counts of properties by city
    try {
        const LahoreCount = await Property.countDocuments({ city: 'Lahore' }); // Used to count properties in Lahore
        const KarachiCount = await Property.countDocuments({ city: 'Karachi' }); // Used to count properties in Karachi
        const IslamabadCount = await Property.countDocuments({ city: 'Islamabad' }); // Used to count properties in Islamabad

        return res.status(200).json({ Lahore: LahoreCount, Karachi: KarachiCount, Islamabad: IslamabadCount }); // Used to send the counts as a response
    } catch (error) {
        return res.status(500).json(error.message); // Used to handle errors
    }
});

// get individual property by ID
propertyController.get("/find/:id", async (req, res) => { // Used to handle getting an individual property by ID http://localhost:5000/property/find/6627fa3281375f9cdfcc06c9
    try {
        const property = await Property.findById(req.params.id).populate("currentOwner", 'password'); // Used to find the property by ID and populate the currentOwner field
        if (!property) {
            throw new Error("No such property with this id"); // Used to handle if no property is found
        } else {
            return res.status(200).json(property); // Used to send the found property as a response
        }
    } catch (error) {
        return res.status(500).json(error.message); // Used to handle errors
    }
});

// create a new property
propertyController.post('/', verifyToken, async (req, res) => { // Used to handle creating a new property
    try {
        const newProperty = await Property.create({ ...req.body, currentOwner: req.user.id }); // Used to create a new property with the current user as the owner
        return res.status(201).json(newProperty); // Used to send the created property as a response
    } catch (error) {
        return res.status(500).json(error.message); // Used to handle errors
    }
});

// update a property by ID
propertyController.put("/:id", verifyToken, async (req, res) => { // Used to handle updating a property by ID PUT
    try {
        const property = await Property.findById(req.params.id); // Used to find the property by ID
        if (property.currentOwner.toString !== req.user.id.toString()) { // Used to check if the current user is the owner of the property
            throw new Error("You are not allowed to update other people's properties"); // Used to handle unauthorized updates
        } else {
            const updatedProperty = await Property.findByIdAndUpdate( // Used to update the property
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            return res.status(200).json(updatedProperty); // Used to send the updated property as a response
        }
    } catch (error) {
        return res.status(500).json(error.message); // Used to handle errors
    }
});

// delete a property by ID
propertyController.delete("/:id", verifyToken, async (req, res) => { // Used to handle deleting a property by ID
    try {
        const property = await Property.findById(req.params.id); // Used to find the property by ID
        if (property.currentOwner.toString !== req.user.id.toString()) { // Used to check if the current user is the owner of the property
            throw new Error("You are not allowed to delete other people's properties"); // Used to handle unauthorized deletions
        } else {
            await property.delete(); // Used to delete the property
            return res.status(200).json({ msg: 'Successfully deleted property' }); // Used to send a success message
        }
    } catch (error) {
        return res.status(500).json(error.message); // Used to handle errors
    }
});

module.exports = propertyController; // Used to export the property controller
