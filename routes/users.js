const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);

// router.use(express.static('public'));
router.use(express.static(__dirname + '/../views')); 


//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();       //passport middleware gives us the req.logout() function
    req.flash('success_msg', 'You have logged out');    
    res.redirect('/users/login');
})

//Login Page
router.get('/login', (req, res) => {
    res.render('login');
})

//Register Page
router.get('/register', (req, res) => {
    res.render('register');
})

//Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {     
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

//Register Handle
router.post('/register', async(req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill all the fields to register'});
    }

    if(password !== password2){
        errors.push({ msg: 'Passwords do not match' });
    }

    if(password.length < 6){
        errors.push({ msg: 'Password must be greater than 6 characters' });
    }

    if(errors.length > 0){
        res.render('register', { errors, name, email }); //rerender the registration form with passed values
    } else {
        //Fields are all valid at this point
        const user = await User.findOne({ email: email });
        if(user){
            errors.push({ msg: 'User already exists' });
            res.render('register', {errors});
        } else {
            try {
                const saltRounds = 12;
                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(password, salt);

                const newUser = new User({
                    name,
                    email,
                    password: hash
                });

                // console.log(newUser);

                await newUser.save();

                req.login(newUser, (err) => {
                    if(err){
                        res.redirect('/users/login');
                    } else {
                        res.redirect('/dashboard');
                    }
                })
                // req.flash('success_msg', 'You have registered successfully');    // you need express-session for this to work
                // res.redirect('/dashboard');

            } catch (err) {
                res.status(500).send('Server Error');
            }
        }
    }
})

module.exports = router;
