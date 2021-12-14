var express = require('express');
var router = express.Router();
var passport = require("passport")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/success', function (req, res, next) {
  res.render("success");
});
router.get('/failure', function (req, res, next) {
  res.render("failure");
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure' }),
  function (req, res) {
    res.redirect('/dashboard');
});
router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/failure' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;
