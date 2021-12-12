var express = require('express');
var router = express.Router();
var Income = require("../models/income")

router.get("/new",(req,res)=>{
    res.render("income")
})
router.get("/",(req,res)=>{
    req.body.user = req.user.id
    Income.create(req.body,(err,income)=>{
        if(err) return next(err)
        res.redirect("/dashboard")
    })
})

module.exports = router;