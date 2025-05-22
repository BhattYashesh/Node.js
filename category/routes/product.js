const express = require("express")
const route = express.Router()
const ctl = require("../controller/productCtl")
const passportSt = require("../middleware/passport")
const multer = require("../middleware/multer2")

route.get("/addProduct",passportSt.checkAuth,ctl.addPro);
route.post("/addProduct",passportSt.checkAuth,multer,ctl.addProduct);
route.get("/viewProduct",passportSt.checkAuth,multer,ctl.viewProduct)
module.exports = route;