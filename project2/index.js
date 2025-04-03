const express = require("express");
const port = 7777;

const app = express();
app.set("view engine" , "ejs")
app.use(express.urlencoded({extended:true}))

let data = [
    {id:1,task:"lunch",priority:"high",status:"fulfill"},
]


app.post("/addData",(req,res)=>{
    req.body.id = data.length + 1;
    data.push(req.body);
    res.redirect("/")
})

app.get("/deleteData" , (req,res)=>{
    let newdata = data.filter((item)=>item.id != req.query.id)
    data = newdata;
    res.redirect("/");
})

app.get("/editData/:id",(req,res)=>{
    let singleData = data.find((item)=>item.id == req.params.id)
    res.render("edit",{singleData})
})

app.post("/updateData" , (req,res)=>{
    data.forEach((item)=>{
        if(item.id == req.body.id)
        {
            item.task = req.body.task;
            item.priority= req.body.priority;
            item.status = req.body.status;
        }
        else{
            item
        }
        res.redirect("/");
    })
   
    
})

app.get("/",(req,res)=>{
    res.render("index",{data});
})

app.listen(port,(err) =>{
  err ? console.log(err):console.log("Server is started on this port" + port);
})