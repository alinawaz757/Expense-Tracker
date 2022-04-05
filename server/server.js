const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();
dotenv.config({ path: "./config.env" })
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(require("./Routes/index"))

//mongodb connection
const conn = require("./db/connection");

conn.then(() => {
    //listen for http server
    
    app.listen(port, () => {
        console.log(`server is running at ${port}`)
    })
    app.on("error", err => console.log(`failed to connect with http server: ${err}`))
}).catch(err=>{
    console.log(`connection failed :${err}`)
})

