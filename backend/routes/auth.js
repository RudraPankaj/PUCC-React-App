const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const { username, studentId, email, contact, gender, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ studentId });
        if(existingUser) return res.status(400).json({ msg: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, studentId, email, contact, gender, password: hashedPassword, role });
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
        
        // safe user payload (excluded password)
        const userPayload = {
            id: user._id,
            username: user.username,
            studentId: user.studentId,
            email: user.email,
            contact: user.contact,
            gender: user.gender,
            role: user.role,
        };

        res.json({ token, isLoggedIn: true, user: userPayload });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// token verification middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token' });
    }
};

// GET /api/auth/me - return current user (authenticated)
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json({ msg: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;