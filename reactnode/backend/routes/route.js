const express = require("express")
const route  = express.Router()
const ctl = require("../controllers/ctl")
const auth = require("../middleware/auth")

route.post("/register",ctl.register)
route.post("/login",ctl.login)
route.get("/allAdmin",auth,ctl.allAdmin)



module.exports  = route