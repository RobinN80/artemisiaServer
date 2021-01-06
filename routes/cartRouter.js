const express = require('express');
const cartRouter = express.Router();

cartRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next()
})
.get((req, res) => {
    res.end('Will send all shopping cart items');
})
.post((req, res) => {
    res.end(`Will add movie: ${req.body.title} with ${req.body.numTickets} to shopping cart`);
})
.put((req, res) => {
    res.write(`Updating movie: ${req.params.title} in shopping cart`);
    res.end();
})
.delete((req, res) => {
    res.end(`Deleting shopping cart`)
});


module.exports = cartRouter;