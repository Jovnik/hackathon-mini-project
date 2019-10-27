const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Word = require('../models/Word');
const User = require('../models/User');
const mongoose  = require('mongoose');

router.use(express.static('public'));



router.get('/all', (req, res) => {

});

router.get('/create-word', (req, res) => {
    res.send('hello');
})

router.get('/test', (req, res) => {
    console.log('HELLO');
    res.render('test');
    // res.send('hello');    

})

router.post('/add-word', ensureAuthenticated, async(req, res) => {

    const { word, partofspeech, definitions } = req.body;

    let user = await User.findOne({_id: req.user._id});   //this is an authenticated route anyway so youll definitely be able to find the user

    // console.log(user);

    // console.log(req.user);

    // console.log(req.body);

    const newWord = new Word({
        word: word,
        partofspeech: partofspeech,
        definition: definitions
    })
    await newWord.save();

    user.words.push(newWord._id);

    await user.save();

    user = await User.findOne({_id: req.user._id}).populate('word'); 
    
    console.log(user);


    // console.log(newWord);


    res.send('something');
})

router.get('/:word', (req, res) => {

});


module.exports = router;