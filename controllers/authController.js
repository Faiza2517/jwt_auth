const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { models } = require('../models');
require('dotenv').config();

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const userExists = await models.User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await models.User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await models.User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { register, login };
