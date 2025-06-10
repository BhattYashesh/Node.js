const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
   role: {
    type: String,
    enum: ["manager"],
    default: "manager"
}
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
