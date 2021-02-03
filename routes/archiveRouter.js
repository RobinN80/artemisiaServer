const express = require("express");
const passport = require("passport");
//const Movie = require("../models/movies");
const MovieArchive = require('../models/archives');
const authenticate = require('../authenticate');

const archiveRouter = express.Router();

archiveRouter
  .route("/")
  .get((req, res, next) => {
    MovieArchive.find()
      .then((movies) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json"); 
        res.json(movies);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyAdmin, (req, res, next) => {
    MovieArchive.create(req.body)
      .then((movie) => {
        console.log("Movie Archived", movie);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(movie);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyAdmin, (req, res) => {
    res.end("Put not accessable on /archives");
  })
  .delete(authenticate.verifyAdmin, (req, res) => {
    res.end(
      "Delete all movies is not supported on /archives, must delete one archive at a time"
    );
  });

archiveRouter
  .route("/:archiveId")
  .get((req, res, next) => {
    MovieArchive.findById(req.params.archiveId)
      .then((movie) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(movie);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`Post operation not supported on /archives/${req.params.archiveId}`);
  })
  .put( (req, res, next) => {
    MovieArchive.findByIdAndUpdate(
      req.params.archiveId,
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
  .delete(authenticate.verifyAdmin, (req, res) => {
    MovieArchive.findByIdAndDelete(req.params.archiveId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => {
        next(err);
    })
  });

module.exports = archiveRouter;