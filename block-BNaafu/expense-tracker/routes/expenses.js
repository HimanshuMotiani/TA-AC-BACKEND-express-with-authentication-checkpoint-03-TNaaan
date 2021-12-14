var express = require('express');
var router = express.Router();
var Expense = require("../models/expense");

router.get("/",(req,res)=>{
    res.render("expense")
})
router.post("/",(req,res)=>{
    req.body.userId = req.session.userId || req.session.passport.user; 
    req.body.type = "Expense"
    Expense.create(req.body,(err,expense)=>{
        if(err) return next(err)
        res.redirect("/dashboard")
    })
})

module.exports = router;