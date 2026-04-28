const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';

// @route   POST api/auth/login
// @desc    Authenticate admin and get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;

    const admin = await Admin.findOne({ adminId: id });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    if (admin.password !== password) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: admin._id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, name: admin.name });
      }
    );
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// @route   GET api/auth/me
// @desc    Get current logged in admin
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Check if the id is a valid mongoose ObjectId
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(401).json({ error: 'Invalid token payload, please log in again' });
    }

    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    console.error('Auth me error', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
