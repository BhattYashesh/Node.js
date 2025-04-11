const express = require("express")
const port = 7777;
const db = require("./config/db")
const firstschema = require("./model/schema");

const app = express();
app.use(express.urlencoded({extended:true}));

app.set("view engine" , "ejs");


app.get("/",async(req,res)=>{
 await firstschema.find({}).then((book)=>{
     res.render("index",{book});
 })
})
app.post("/addData",async(req,res)=>{
  await firstschema.create(req.body).then(()=>{
    res.redirect("/");
    })
})

app.get("/deleteData",async(req,res)=>{
  await firstschema.findByIdAndDelete(req.query.id).then(()=>{
     res.redirect("/");
  })
})
app.get("/editData",async(req,res)=>{
  await firstschema.findById(req.query.id).then((book)=>{
    res.render("edit",{book})
  })
})

app.post("/updateData",async(req,res)=>{
  await firstschema.findByIdAndUpdate(req.body.id , req.body).then(()=>{
     res.redirect("/");
  })
})


app.get("/",(req,res)=>{
  res.render("index")
})

app.get("/addNew",(req,res)=>{
    res.render("add")
})

app.listen(port,(err)=>{
    err ? console.log(err):console.log("Servevr is started on port" + port);
})