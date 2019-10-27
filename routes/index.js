const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { merriam_webster_api_key } = require('../config/keys');

router.use(express.static('public'));

router.get('/', (req, res) => {
    res.render('splash');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {    //need to add ensureAuthenticated
    // console.log('GOING TO PRINT THE USER');
    // console.log(req.user);

    res.render('dashboard', { merriam_webster_api_key });
})

module.exports = router;