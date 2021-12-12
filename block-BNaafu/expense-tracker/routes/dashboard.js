var express = require('express');
var router = express.Router();
var Income = require("../models/income")

router.get("/",(req,res)=>{
    res.render("dashboard")
})

module.exports = router;