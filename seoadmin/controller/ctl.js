const schema = require("../model/schema")
const mailer = require("../middleware/mailer")
const fs = require("fs")

module.exports.login = (req, res) => {
  res.render("login")
}

module.exports.loginAdmin = async (req, res) => {
  res.redirect("dashboard")
}


module.exports.dashboard = (req,res)=>{
  res.render("dashboard");
}


module.exports.addAdmin = (req,res)=>{
    res.render("addAdmin");
}

module.exports.viewAdmin = (req,res)=>{
    res.render("viewAdmin");
}



module.exports.addAdmindata = async (req,res)=>{
    req.body.profile = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/addAdmin")
      })
}




module.exports.deleteAdmin = async (req, res) => {
  let singleRecord = await schema.findById(req.query.id);
  fs.unlinkSync(singleRecord.profile)
  await schema.findByIdAndDelete(req.query.id).then(() => {
    res.redirect("/viewAdmin");
  })

}


module.exports.editAdmin = async (req, res) => {
  await schema.findById(req.query.id).then((data) => {
    res.render("editAdmin", { data });
  })
}


module.exports.viewAdmin = async (req, res) => {
  await schema.find({}).then((data) => {
    res.render("viewAdmin", { data })
  })

}


module.exports.updateAdmin = async (req, res) => {

  let singleRecord = await schema.findById(req.body.id);
  let img;

  req.file ? img = req.file.path : img = singleRecord.profile;
  req.file && fs.unlinkSync(singleRecord.profile);

  req.body.profile = img;

  await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
    res.redirect("/viewAdmin")
  })
 
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
               await schema.findByIdAndUpdate(admin.id,{password:req.body.newPass}).then(()=>{
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

module.exports.forgetPassword = (req,res)=>{
  res.render("forgetPass");
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


module.exports.lostpass = async (req,res) =>{
 let admin = await schema.findOne({email : req.body.email})

 if(!admin)
 {
     return res.redirect("/")
 }
 let otp = Math.floor(Math.random()*1000 + 9000)

 mailer.sendOTP(req.body.email,otp)
 req.session.otp = otp
 req.session.adminData = admin
 res.render("verifyPass")  



}

module.exports.verifyPassword = async(req,res)=>{
  let otp = req.session.otp
  let admin = req.session.adminData

  if(otp == req.body.otp)
  {
     if(req.body.newPass == req.body.confirmPass)
           {
               await schema.findByIdAndUpdate(admin._id,{password:req.body.newPass}).then(()=>{
                res.redirect("/")
                
               })
           }
           else{

            res.redirect("/")
           }
  }
  else{
    res.redirect("/")
  }
}