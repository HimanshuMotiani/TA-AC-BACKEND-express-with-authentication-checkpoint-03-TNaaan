var User = require("../models/user");

module.exports = {
  loggedInUser: (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    }
    if (req.session && req.session.passport) {
        next();
    }
    else {
      res.redirect("/users/login");
    }
  },
  userInfo: (req, res, next) => {
      console.log(req,session,req.session.userId,"session");
    var userId = (req.session && req.session.userId) ||
      (req.session && req.session.passport && req.session.passport.user);
      console.log(userId,"userId");
    if (userId) {
      User.findById(userId, "name , email", (err, user) => {
          console.log(err,user,"aaaa");
        if (err) return next(err);
        req.user = user;
        res.locals.user = user;
        next();
      });
    } else {
        console.log("aaabb");
      req.user = null;
      res.locals.user = null;
      next();
    }
  },
};