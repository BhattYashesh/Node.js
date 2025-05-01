const  Schema  = require("../model/schema")
const fs = require("fs");

module.exports.dashboard = (req,res)=>{
   if(req.cookies.admin)
   {
    res.render("dashboard")
   }else{
    res.redirect("/");  
   }
}

module.exports.login= (req,res)=>{
  res.render("login")
}
module.exports.loginAdmin= async(req,res)=>{
 let admin = await Schema.findOne({email : req.body.email})
 if(admin){
    if(req.body.password == admin.password)
    {
      res.cookie("admin",admin)
      res.redirect("/dashboard")
    }
    else{
      res.redirect("/")
    }
 }else{
  res.redirect("/")
 }

}

module.exports.addAdmin = (req,res)=>{
  if(req.cookies.admin)
    {
     res.render("addAdmin")
    }else{
     res.redirect("/");
    }

}

module.exports.addAdminData = async (req,res)=>{
  req.body.profile = req.file.path;
  await Schema.create(req.body).then(()=>{
    res.redirect("/addAdmin")
  })
  
}

module.exports.deleteAdmin = async(req,res)=>{
  let singleRecord = await Schema.findById(req.query.id);
  fs.unlinkSync(singleRecord.profile)
  await Schema.findByIdAndDelete(req.query.id).then(()=>{
     res.redirect("/viewAdmin");
  })
  
}

module.exports.editAdmin = async (req,res) => {
  await Schema.findById(req.query.id).then((data)=>{
    res.render("editAdmin",{data});
  })
}

module.exports.viewAdmin = async(req,res)=>{
    await Schema.find({}).then((data)=>{
        res.render("viewAdmin",{data})
    })
  
}

module.exports.updateAdmin = async (req,res) => {

  let singleRecord = await Schema.findById(req.body.id);
  let img;

  req.file ? img = req.file.path : img = singleRecord.profile;
  req.file && fs.unlinkSync(singleRecord.profile); 

  req.body.profile = img;

  await Schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
    res.redirect("/viewAdmin")
  })
}

module.exports.logout = (req,res) => {
  res.clearCookie("admin");
  res.redirect("/");
}