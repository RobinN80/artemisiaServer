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
});

module.exports = movieRouter;