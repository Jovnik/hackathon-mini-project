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
    res.send('hello');    

})

router.get('/mywords', async(req, res) => {

    // const user = await User.findOne({_id: req.user._id}).populate('words');
    // const words = user.words;
    // console.log(words);


    res.render('mywords');
})

router.post('/new-word', async(req, res) => {
    console.log(req.body);
    console.log('hello');
})

router.post('/check-existing-word', async(req, res) => {

})

router.post('/add-word', ensureAuthenticated, async(req, res) => {

    const { word, partofspeech, definitions } = req.body;

    const user = await User.findOne({_id: req.user._id}).populate('words');   //this is an authenticated route anyway so youll definitely be able to find the user

    //need to check if the word that we're going to add is already in the users 'words' 
    const usersWords = user.words;
    let wordFound = false;

    // need to use a for loop to check for the word so we can break (forEach loops cant leave the loop early)
    for(let i=0; i<usersWords.length; i++){
        if(usersWords[i].word == word && usersWords[i].partofspeech == partofspeech){
            wordFound = true;
            break;
        }
    }

    if(wordFound){
        return res.send({error: true, msg: `You have already added the ${partofspeech} ${word}`})
    }


    const newWord = new Word({
        word: word,
        partofspeech: partofspeech,
        definition: definitions
    })
    await newWord.save();

    user.words.push(newWord._id);

    await user.save();

    res.send({error: false, msg: 'successfully completed the route'});

})

router.get('/:word', (req, res) => {

});


module.exports = router;