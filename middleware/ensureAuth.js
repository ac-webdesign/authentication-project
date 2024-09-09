const User = require('../models/User')

async function ensureAuthenticated(req, res, next) {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId); // No callback, just await the result
            if (!user) {
                return res.redirect('/login');
            }
            req.user = user;  // Store the user object in req.user
            next();
        } catch (err) {
            console.log(err);
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
}


  
  module.exports = ensureAuthenticated;
  