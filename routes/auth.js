const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registration Route
router.post('/signup', async (req, res) => {
    console.log('signup post data:', req.body)
    const { username, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.render('signup', { error: 'User already exists.', title: 'Sign Up' });
    }
  
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.redirect('/login');

    } catch (error) {
        // Handle duplicate key error (E11000) for username or email
        if (error.code === 11000) {
            if (error.message.includes('username')) {
                return res.render('signup', { error: 'Username already taken.', title: 'Sign Up' });
            } else if (error.message.includes('email')) {
                return res.render('signup', { error: 'Email already registered.', title: 'Sign Up' });
            }
        }
        
        console.error('Error during signup:', error.message);
        res.status(500).send('Server error');
    }
});
  

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Invalid credentials.');
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).send('Invalid credentials.');
      }

      if (!req.session) {
        return res.status(500).send('Session not initialized.');
      }
      req.session.userId = user._id;
      req.user = user; // Set the user in the request object
      res.redirect('/notes');
      console.log(user._id)
    } catch (error) {
        console.error('Error during login:', error.message); // Log the error message for debugging
        res.status(500).send('Server error', error.message);
    }
  });

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Server error');
    }
    res.redirect('/login');
  });
});

module.exports = router;
