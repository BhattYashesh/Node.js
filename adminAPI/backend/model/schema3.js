const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "employee" }, // will always be 'employee'
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
