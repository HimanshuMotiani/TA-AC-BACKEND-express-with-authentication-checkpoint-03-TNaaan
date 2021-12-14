var express = require('express');
var router = express.Router();
var User = require("../models/user")
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  var error = req.flash("error")[0];
  res.render('login',{error});
});

router.get('/register', function (req, res, next) {
  var error = req.flash("error")[0];
  res.render('register',{error});
});

router.post('/register', function (req, res, next) {
  var { email, password } = req.body

  if (!email || !password) {
    req.flash("error", "Email and Password required")
    res.redirect("/users/register")
  }
  User.create(req.body, (err, user) => {
    if (err) {
      req.flash("error", err.message)
      res.redirect("/users/register")
    }
    res.redirect('/users/login');
  })
});

router.post('/login', function (req, res, next) {
  var {email,password} = req.body;
  if (!email || !password) {
    req.flash("error", "Email and Password required")
    res.redirect("/users/login")
  }
  User.findOne({email},(err,user)=>{
    if(err) return next(err);
    if (!user) {
      req.flash('error', 'Email not registered');
      return res.redirect("/users/login")
    }
    user.verifyPassword(password,(err,result)=>{
      if(!result){
        req.flash('error', 'Entered wrong password');
        return res.redirect("/users/login")
      }
    req.session.userId = user.id;
    res.redirect("/dashboard")
    })
  })
});

router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.clearCookie('connect.sid')
  res.redirect("/users/login")
})

module.exports = router;
