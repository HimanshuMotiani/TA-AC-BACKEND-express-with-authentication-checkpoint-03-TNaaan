var express = require('express');
var router = express.Router();
var Expense = require("../models/expense");

router.get("/new",(req,res)=>{
    res.render("expense")
})
router.get("/",(req,res)=>{
    req.body.user = req.user.id
    Expense.create(req.body,(err,expense)=>{
        if(err) return next(err)
        res.redirect("/dashboard")
    })
})

module.exports = router;