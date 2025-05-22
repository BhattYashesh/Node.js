//MVC -> Model --- View --- Controller

const express = require("express");
const path = require("path");
const port = 1008
const cookie = require("cookie-parser")
const passport = require("passport")
const session = require("express-session")
const connectflash = require("connect-flash");
const flash = require("./middleware/flash")

const app = express();

const db = require("./config/db")

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(cookie())


app.use(session({
    name : "local",
    secret : 'rnw',
    resave : true,
    saveUninitialized : false ,
    cookie : {maxAge : 100*100*60}  // timing of cookie is upto 10 min 
}))

app.use(passport.session())
app.use(passport.initialize())



app.use(connectflash())
app.use(flash.setFlash)

app.use("/",require("./routes/route"))
app.use("/category",require("./routes/category"))
app.use("/subcategory",require("./routes/subCategory"))
app.use("/product",require("./routes/product"))


app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started on port : " + port);
})