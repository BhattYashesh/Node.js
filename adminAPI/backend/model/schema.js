// const mongoose = require("mongoose");

// const schema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ["admin", "manager", "employee"],
//     default: "admin"
//   }
// });

// const User = mongoose.model("User", schema);

// module.exports = User;

const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "employee"],
    default: "admin"
  }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

