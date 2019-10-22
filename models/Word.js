const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    partofspeech: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    example: {
        type: String,
        required: true
    },
    bookfoundin: {
        type: String
    },
    dayfound: {
        type: Date,
        default: Date.now
    }
})