const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// User registration
exports.register = async (req, res) => {
    try {
        const { username, password, role, school } = req.body;
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {

            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username,
            password: hashedPassword,
            role,
            school,
        });
        console.log("gdhhhhhhh", user)
        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User authentication
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ username, role: user.role }, 'your-secret-key');

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};