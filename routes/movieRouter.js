const express = require('express');
const movieRouter = express.Router();

movieRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next()
})
.get((req, res) => {
    res.end('Will send all movies');
})
.post((req, res) => {
    res.end('Will post movies')
})
.put((req, res) => {
    res.end('Put not accessable on /movies')
})
.delete((req, res) => {
    res.end('Deleting all movies')
});

movieRouter.route('/:movieId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next()
})
.get((req, res) => {
    res.end(`Sending movie: ${req.params.movieId}`);
})
.post((req, res) => {
    res.end(`Posting movie: ${req.params.movieId}`)
})
.put((req, res) => {
    res.end(`Updating movie: ${req.params.movieId}`)
})
.delete((req, res) => {
    res.end(`Deleting movie: ${req.params.movieId}`)
});

module.exports = movieRouter;