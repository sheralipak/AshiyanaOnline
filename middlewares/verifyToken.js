const jwt = require("jsonwebtoken"); // Used for JSON Web Token (JWT) handling

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    // Check if authorization header is present
    if (!req.headers.authorization) {
        return res.status(403).json({ msg: "Not authorized. No token" }); // Return error response if no authorization header is found
    }
    // Check if authorization header contains a Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        // Extract the token from the authorization header
        const token = req.headers.authorization.split(" ")[1]; // ["Bearer", "dasugydsayeyeeyedsahdsadsa"]
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({ msg: 'Wrong or expired token.' }); // Return error response if token is invalid or expired
            } else {
                req.user = data; // Store the decoded token data (e.g., user ID) in the request object
                next(); // Call the next middleware in the chain
            }
        });
    }
};

module.exports = verifyToken; // Export the verifyToken middleware
