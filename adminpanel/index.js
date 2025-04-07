const express = require("express");
const port = 7777;
const path = require("path")

const app = express();
app.set("view engine" , "ejs");

app.use(express.static(path.join(__dirname,"public")))

app.get("/dashboard",(req,res)=>{
    res.render("dashboard");
})



app.get("/",(req,res)=>{
    res.render("index");
})


app.listen(port,(err)=>{
    err ? console.log(err):console.log("Server is started on this port" + port);
})