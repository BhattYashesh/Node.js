const express = require("express")
const route = express.Router();
const ctl = require("../controller/ctl");
const multer = require("../middleware/multer")
const passport = require("passport");
const passportSt = require("../middleware/passport")

route.get("/",ctl.login)
route.get("/logout",passportSt.checkAuth,ctl.logout)
route.get("/dashboard",passportSt.checkAuth,ctl.dashboard)
route.post("/login",passportSt.authenticate("local",{failureRedirect:"/"}),ctl.loginAdmin)
route.get("/addAdmin",passportSt.checkAuth,ctl.addAdmin)
route.get("/viewAdmin",passportSt.checkAuth,ctl.viewAdmin)
route.post("/addAdmindata",multer,ctl.addAdmindata)
route.get("/editAdmin",passportSt.checkAuth,ctl.editAdmin)
route.post("/updateAdmin",passportSt.checkAuth,multer,ctl.updateAdmin)
route.get("/deleteAdmin",passportSt.checkAuth,ctl.deleteAdmin)
route.get("/changePass",passportSt.checkAuth,ctl.changePass)
route.post("/changePass",passportSt.checkAuth,ctl.changePassword)
route.get("/forgetPass",ctl.forgetPassword)
route.post("/forgetPass",ctl.lostpass)
route.post("/verifyPass",ctl.verifyPassword)


module.exports = route;