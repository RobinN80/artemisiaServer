var express = require('express');
var router = express.Router();
const passport = require('passport');
const user = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  user.register(
    new user({username: req.body.username}),
    req.body.password,
    err => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err : err});
      } else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful'})
        });
      }
    }
  );
});

router.post('/login', passport.authenticate('local'),(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in!'})
});


router.get('/logout', (req, res, next) =>{
  if (req.session) {
    req.session.destroy();
    //req.clearCookie('session-id');
    res.redirect('/');
  } else {
    const err = new Error('You are not logged in.');
    err.status = 401;
    return next(err);
  }
});

module.exports = router;
