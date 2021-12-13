var express = require('express');
var router = express.Router();
var Income = require("../models/income")
var Expense = require("../models/expense")
var moment = require("moment")

router.get("/",(req,res)=>{
    var summary = [];
    var savings = 0;
    var incomeTotal = 0;
    var expenseTotal = 0;
    var summarySort;
    var id;
    if(!req.session.userId){
     id = req.session.passport.user
    }
    else{
        id = req.session.userId
    }
    Income.find({userId:id},(err,income)=>{
       income.map(item=>{
           incomeTotal = incomeTotal + item.amount
       })
        Expense.find({userId:id},(err,expense) =>{
            expense.map(item=>{
                expenseTotal = expenseTotal + item.amount
        })
        savings = incomeTotal -  expenseTotal
        summary.push(income,expense)
        summary = summary.flat()
        summary = summary.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          res.render('dashboard',{summary,savings,moment})
        }) 
    })
    
})
router.get("/sortByIncome",(req,res)=>{
    var summary = [];
    var savings = 0;
    var incomeTotal = 0;
    var expenseTotal = 0;
    var summarySort;
    var id;
    if(!req.session.userId){
     id = req.session.passport.user
    }
    else{
        id = req.session.userId
    }
    Income.find({userId:id},(err,income)=>{
       income.map(item=>{
           incomeTotal = incomeTotal + item.amount
       })
        Expense.find({userId:id},(err,expense) =>{
            expense.map(item=>{
                expenseTotal = expenseTotal + item.amount
        })
        savings = incomeTotal -  expenseTotal
        summary.push(income)
        summary = summary.flat()
        summary = summary.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          res.render('dashboard',{summary,savings,moment})
        }) 
    })
    
})
router.get("/sortByExpense",(req,res)=>{
    var summary = [];
    var savings = 0;
    var incomeTotal = 0;
    var expenseTotal = 0;
    var id;
    if(!req.session.userId){
     id = req.session.passport.user
    }
    else{
        id = req.session.userId
    }
    Income.find({userId:id},(err,income)=>{
       income.map(item=>{
           incomeTotal = incomeTotal + item.amount
       })
        Expense.find({userId:id},(err,expense) =>{
            expense.map(item=>{
                expenseTotal = expenseTotal + item.amount
        })
        savings = incomeTotal -  expenseTotal
        summary.push(expense)
        summary = summary.flat()
        summary = summary.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          res.render('dashboard',{summary,savings,moment})
        }) 
    })
    
})
router.post("/sortByDates", (req, res) => {
    var summary = [];
    var savings = 0;
    var incomeTotal = 0;
    var expenseTotal = 0;
    console.log(req.body, "sort");
    var su;
    Expense.find({ date: { $gte: req.body.start_date, $lt: req.body.end_date } }, (err, expense) => {
        expense.map(item => {
            expenseTotal = expenseTotal + item.amount
        })
        Income.find({ date: { $gte: req.body.start_date, $lte: req.body.end_date } }, (err, income) => {
            income.map(item => {
                incomeTotal = incomeTotal + item.amount
            })
            savings = incomeTotal - expenseTotal
            summary = [...expense, ...income].sort((a, b) => {
                return a.date - b.date;
            });
            res.render('dashboard', { summary, savings, moment })
        })
    });
})

module.exports = router;