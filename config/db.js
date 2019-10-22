const mongoose = require('mongoose');
const db = require('./keys').MONGOURI;

const connectDB = async() => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log('Connected to mongo database ✔️');
    } catch(err) {
        console.error(err.message);
        console.log('MongoDB Not Connected ❌')
    }
}

module.exports = connectDB;