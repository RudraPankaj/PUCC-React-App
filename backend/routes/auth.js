const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const { username, profileimgurl, studentId, email, contact, gender, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ studentId });
        if(existingUser) return res.status(400).json({ msg: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, profileimgurl, studentId, email, contact, gender, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ msg: "User registered successfully. Redirecting to login page..." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try{
        const user = await User.findOne({ email, role });
        if(!user) return res.status(400).json({ msg: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Wrong password!" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;