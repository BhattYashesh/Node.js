const express = require("express")
const route = express.Router()
const ctl = require("../controller/subCategoryCtl")
const passportSt = require("../middleware/passport");


route.get("/addSubCat",passportSt.checkAuth,ctl.addSubCat);
route.post("/addSubCat",passportSt.checkAuth,ctl.addSubCategory);
route.get("/viewSubCat",passportSt.checkAuth,ctl.viewSubCat)

module.exports = route;