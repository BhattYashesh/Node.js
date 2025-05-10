const { log } = require("console");
const Schema = require("../model/schema")
const fs = require("fs");

module.exports.dashboard = (req, res) => {
    res.render("dashboard")
}

module.exports.login = (req, res) => {
  res.render("login")
}
module.exports.loginAdmin = async (req, res) => {
   req.flash("success","Login Successfully!")
   res.redirect("dashboard")
}

module.exports.addAdmin = (req, res) => {
  
  res.render("addAdmin");
}

module.exports.addAdminData = async (req, res) => {
  req.body.profile = req.file.path;
  await Schema.create(req.body).then(() => {
    req.flash("success","admin added!")
    res.redirect("/addAdmin")
  })

}

module.exports.deleteAdmin = async (req, res) => {
  let singleRecord = await Schema.findById(req.query.id);
  fs.unlinkSync(singleRecord.profile)
  await Schema.findByIdAndDelete(req.query.id).then(() => {
    res.redirect("/viewAdmin");
  })

}

module.exports.editAdmin = async (req, res) => {
  await Schema.findById(req.query.id).then((data) => {
    res.render("editAdmin", { data });
  })
}

module.exports.viewAdmin = async (req, res) => {
  await Schema.find({}).then((data) => {
    res.render("viewAdmin", { data })
  })

}

module.exports.updateAdmin = async (req, res) => {

  let singleRecord = await Schema.findById(req.body.id);
  let img;

  req.file ? img = req.file.path : img = singleRecord.profile;
  req.file && fs.unlinkSync(singleRecord.profile);

  req.body.profile = img;

  await Schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
    res.redirect("/viewAdmin")
  })
}

module.exports.logout = (req, res) => {
   req.session.destroy((err)=>{
    if(err)
    {
      console.log("error destroying session : ",err);
      return res.redirect("/dashboard");
      
    }
   });
  res.redirect("/");
}

module.exports.profile = (req,res)=>{
   res.render("profile")
}


module.exports.changePass = (req,res) =>{
  res.render("changePass");
}

module.exports.changePassword = async (req,res) =>{
  let admin = req.user;
 
  if(admin.password == req.body.oldPass)
  {
      if(req.body.oldPass != req.body.newPass)
      {
           if(req.body.newPass == req.body.confirmPass)
           {
               await Schema.findByIdAndUpdate(admin.id,{password:req.body.newPass}).then(()=>{
                res.redirect("/logout")
                
               })
           }
           else{
            res.redirect("/changePass")
           }
      }
      else{
        res.redirect("/changePass")
      }
  }else{
    res.redirect("/changePass")
  }
}