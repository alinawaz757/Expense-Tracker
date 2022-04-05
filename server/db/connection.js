const mongoose = require("mongoose");

//connect to mongodb atlas
const conn = mongoose.connect(process.env.ATLAS_DB)
    .then((db)=>{
        if(db)console.log("connected to mongodb+srv://alinawaz")
    }).catch(err=>{
        console.log("err",err)
    })

//connect to local

// const conn = mongoose.connect("mongodb://localhost:27017/expense-database", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(db=>{
//     if(db) return console.log("connected to local")
// }).catch(err=>{
//     if(err) return console.log("err", err)
// })

module.exports = conn
