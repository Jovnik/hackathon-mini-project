const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'word'
    }],
    bio: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }


})

const Profile = mongoose.model('profile', ProfileSchema);