const express = require("express");
const port = 7777;
const path = require("path");
const passport = require("passport")
const session = require("express-session")

const app = express()
const db = require("./config/db")
app.set("view engine" , "ejs");

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


app.use(session({
    name : "local",
    secret : 'rnw',
    resave : true,
    saveUninitialized : false ,
    cookie : {maxAge : 100*100*60}  // timing of cookie is upto 10 min 
}))

app.use(passport.session())
app.use(passport.initialize())


app.use("/",require("./routes/route"))

app.listen(port,(err)=>{
    err ? console.log(err):console.log("Server is started on this port" + port);
})
