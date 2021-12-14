var mongoose = require("mongoose");
var Schema = mongoose.Schema

var incomeSchema = new Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId,ref:"User"},
    type:String
},{timestamps:true})

module.exports = mongoose.model("Income", incomeSchema)