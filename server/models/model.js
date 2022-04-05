const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cat_model = new Schema({
    type:{type:String, default:"Investment"},
    color:{type:String, default:"green"}
});

const tran_model = new Schema({
    name:{type:String, default:"anonymous"},
    type:{type:String, default:"Investment"},
    amount:String,
    date:{type:Date, default:Date.now}
});

const Categories = mongoose.model("categories",cat_model);
const Transactions = mongoose.model("transactions",tran_model);

exports.default = Transactions;
module.exports = {
    Categories,
    Transactions
}