const express = require("express")
const route  = express.Router()
const ctl = require("../controllers/ctl")


route.post("/register",ctl.register)
route.post("/login",ctl.login)
route.get("/admin",ctl.admin)

route.post("/add-manager", ctl.addManager);
route.post("/add-employee", ctl.addEmployee);

route.get("/manager", ctl.manager);
route.get("/employee", ctl.employee);
route.get("/view-employee", ctl.employee);

route.delete("/employee/:id", ctl.deleteEmployee);
route.delete("/manager/:id", ctl.deleteManager);


module.exports  = route