const LocalStrategy = require('passport-local').Strategy;   //need to create the local strategy
const mongoose = require('mongoose');   // also need mongoose because we're logging in and need to check for email/password matches
const bcrypt = require('bcryptjs');     // need becrypt to decrypt the hash to compare them

// Load User Model
const User = require('../models/User');

// exporting the passport strategy
module.exports = (passport) => {  

    passport.use(
      new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        try {
          const user = await User.findOne({email: email})
          if (!user) { return done(null, false, {message: "Email Not Registered"}) }
  
          // If user matches
          const isMatch = await bcrypt.compare(password, user.password)   //will compare the plain text password with the stored hashed password and return true or false
          if (isMatch) { return done(null, user) }
          else {
            return done(null, false, {message: 'Password Incorrect'})
          }
        }
        catch(err) {
          console.log(err);
        }
        
      })
    )
    
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });
}