const userService = require('../services/userService');

exports.register = async (req, res) => {
    const { name, email, password } = req.body; // Use name
    try {
        const userExists = await userService.checkUserExists(email);
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await userService.register(name, email, password); // Capture the created user
        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Registration error: ", error);
        return res.status(500).json({ message: error.message }); // Return the error message
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.userID; // ID from JWT middleware
        const user = await userService.getUserById(userId);
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user: ", error);
        return res.status(500).json({ message: error.message }); // Return the error message
    }
};
