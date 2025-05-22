const express = require("express")
const route = express.Router()
const ctl = require("../controller/categoryCtl")
const passportSt = require("../middleware/passport")
const multer = require("../middleware/multer2")

route.get("/addCat",passportSt.checkAuth,ctl.addCat);
route.post("/addCat",passportSt.checkAuth,multer,ctl.addCategory);
route.get("/viewCat",passportSt.checkAuth,multer,ctl.viewCat)
module.exports = route;