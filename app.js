const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Passport config
// require('./config/passport')(passport);

const connectDB = require('./config/db');
connectDB();

const app = express();

// app.use(express.static(__dirname + '/views'));       //need this to render local styles?

app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));

// Express Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

//Connect Flash
app.use(flash());

//Global Variables - setting our own global variables in the middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
})

// Embedded JavaSript (EJS)
app.use(expressLayouts);    //initialize the express layouts functionality
app.set('view engine', 'ejs')   //need to set our view engine to ejs

//Routes
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/index'));


app.listen(PORT, () => {console.log(`Connected to port ${PORT}`)});