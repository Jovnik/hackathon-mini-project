const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.use(express.static('public'));

router.get('/', (req, res) => {
    res.render('splash');
})

router.get('/dashboard', (req, res) => {    //need to add ensureAuthenticated
    // console.log('GOING TO PRINT THE USER');
    console.log(req.user);

    res.render('dashboard');
})

module.exports = router;