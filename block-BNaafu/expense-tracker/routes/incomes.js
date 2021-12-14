var express = require('express');
var router = express.Router();
var Income = require("../models/income")

router.get("/",(req,res)=>{
    res.render("income")
})
router.post("/",(req,res)=>{
    req.body.userId = req.session.userId  || req.session.passport.user; 
    req.body.type = "Income"
    Income.create(req.body,(err,income)=>{
        if(err) return next(err)
        res.redirect("/dashboard")
    })
})

module.exports = router;