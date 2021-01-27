const express = require("express");
const Movie = require("../models/movies");

const movieRouter = express.Router();

movieRouter
  .route("/")
  .get((req, res, next) => {
    Movie.find()
      .then((movies) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(movies);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Movie.create(req.body)
      .then((movie) => {
        console.log("Movie Posted", movie);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(movie);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.end("Put not accessable on /movies");
  })
  .delete((req, res) => {
    res.end(
      "Delete all movies is not supported on /movies, must delete one movie at a time"
    );
  });

movieRouter
  .route("/:movieId")
  .get((req, res, next) => {
    Movie.findById(req.params.movieId)
      .then((movie) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(movie);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`Post operation not supported on /movie/${req.params.movieId}`);
  })
  .put((req, res, next) => {
    Movie.findByIdAndUpdate(
      req.params.movieId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((movie) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(movie);
      })
      .catch((err) => next(err));
  })
  .delete((req, res) => {
    Movie.findByIdAndDelete(req.params.movieId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => {
        next(err);
    })
  });

module.exports = movieRouter;
