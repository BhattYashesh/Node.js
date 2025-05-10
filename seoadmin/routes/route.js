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

module.exports = route;