const schema = require("../model/schema")
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