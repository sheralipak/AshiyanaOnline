const authController = require('express').Router(); // Used to define the authentication controller

const User = require('../models/User'); // Used to import the User model
const bcrypt = require("bcrypt"); // Used for password hashing
const jwt = require('jsonwebtoken'); // Used for generating JSON web tokens

// register
authController.post('/register', async (req, res) => { // Used to handle user registration
  try {
    const isExisting = await User.findOne({ email: req.body.email }); // Used to check if the user already exists

    if (isExisting) { // Used to handle if the user already exists
      throw new Error("Already email registered!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Used to hash the user's password

    const newUser = await User.create({ ...req.body, password: hashedPassword }); // Used to create a new user

    const { password, ...others } = newUser._doc; // Used to remove the password from the user data

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // Used to generate a JWT token

    return res.status(201).json({ newUser: others, token }); // Used to send response with the new user data and token
  } catch (error) {
    return res.status(500).json(error.message); // Used to handle errors
  }
});

// login
authController.post('/login', async (req, res) => { // Used to handle user login
  try {
    const user = await User.findOne({ email: req.body.email }); // Used to find the user by email

    if (!user) { // Used to handle if the user does not exist
      throw new Error("Wrong credentials!");
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password); // Used to compare passwords

    if (!comparePass) { // Used to handle if passwords don't match
      throw new Error("Wrong credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '72h' }); // Used to generate a JWT token

    const { password, ...others } = user._doc; // Used to remove the password from the user data

    return res.status(200).json({ user: others, token }); // Used to send response with the user data and token
  } catch (error) {
    return res.status(500).json(error.message); // Used to handle errors
  }
});

module.exports = authController; // Used to export the authentication controller
