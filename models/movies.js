const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    orgin: String,
    genre: String, 
    language: String,
    description: String
} , {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;