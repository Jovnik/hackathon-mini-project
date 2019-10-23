const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.use(express.static('public'));

router.get('/words/:word', (req, res) => {

});

router.get('/words/all', (req, res) => {

});
