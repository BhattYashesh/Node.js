const express = require("express");
const route = express.Router()
const ctl = require("../controller/ctl")
const multer = require("../middleware/multer")

route.get("/",ctl.login)
route.get("/logout",ctl.logout)
route.post("/login",ctl.loginAdmin)
route.get("/dashboard",ctl.dashboard)
route.get("/addAdmin",ctl.addAdmin)
route.post("/addAdmin",multer,ctl.addAdminData)
route.get("/viewAdmin",ctl.viewAdmin)
route.get("/editAdmin",ctl.editAdmin)
route.post("/updateAdmin",multer,ctl.updateAdmin)
route.get("/deleteAdmin",ctl.deleteAdmin)

module.exports = route