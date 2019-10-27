const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'word'
    }]
})

User = mongoose.model('user', UserSchema);

module.exports = User;


