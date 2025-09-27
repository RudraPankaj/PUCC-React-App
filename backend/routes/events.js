const express = require('express');
const router = express.Router();
const Event = require('../models/Events');
const jwt = require('jsonwebtoken');

// token verification middleware (same logic as auth.js)
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

// POST /api/events - create event (authenticated)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, date, publishedBy, summary, image, lastRegistrationDate, wing } = req.body;
    const ev = new Event({
      title,
      date: date ? new Date(date) : undefined,
      publishedBy,
      summary,
      image,
      lastRegistrationDate: lastRegistrationDate ? new Date(lastRegistrationDate) : undefined,
      wing
    });
    await ev.save();
    res.status(201).json({ msg: 'Event created', event: ev });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/events - list events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;