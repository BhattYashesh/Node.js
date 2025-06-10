const schema = require("../model/schema");
const Manager = require("../model/schema2");
const Employee = require("../model/schema3");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register → only admin
module.exports.register = async (req, res) => {
  try {
    let user = await schema.findOne({ email: req.body.email });
    if (user) {
      return res.status(200).json({ msg: "User already registered" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "admin"; // Force role admin

    let createdUser = await schema.create(req.body);
    return res.status(200).json({ msg: "User successfully created!", user: createdUser });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};

// Login
module.exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!role) {
      return res.status(400).json({ msg: "Please select a role", code: 103 });
    }

    let user;

    if (role === "admin" || role === "employee") {
      user = await schema.findOne({ email });
    } else if (role === "manager") {
      user = await Manager.findOne({ email });
    }

    if (!user) {
      return res.status(200).json({ msg: "User Not Found !", code: 100 });
    }

    if (user.role !== role) {
      return res.status(200).json({ msg: `User is not a ${role}`, code: 104 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ msg: "Password is incorrect!", code: 102 });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      "rnw",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      msg: "User Logged In Successfully!",
      code: 200,
      token: token,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", error });
  }
};

// Admin data fetch
module.exports.admin = async (req, res) => {
  try {
    const admins = await schema.find({ role: "admin" }); // Only fetch admins
    const adminName = admins.length > 0 ? admins[0].name : "No Admin";

    return res.status(200).json({
      msg: "All Data Is Here",
      data: admins,
       name: adminName, 
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};

// Add Manager → by admin
module.exports.addManager = async (req, res) => {
 try {
    let user = await Manager.findOne({ email: req.body.email });
    if (user) {
      return res.status(200).json({ msg: "Manager already exists" });
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let createdManager = await Manager.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: "manager", // Explicit
    });

    return res.status(200).json({ msg: "Manager added successfully!", user: createdManager });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};

// Add Employee → by manager
module.exports.addEmployee = async (req, res) => {
 try {
    let user = await Employee.findOne({ email: req.body.email });
    if (user) {
      return res.status(200).json({ msg: "Employee already exists" });
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let createdEmployee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: "employee", // Explicit
    });

    return res.status(200).json({ msg: "Employee added successfully!", user: createdEmployee });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};

module.exports.manager = async (req, res) => {
  try {
   const managers = await Manager.find(); 
    return res.status(200).json({ data: managers });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};

module.exports.employee = async (req, res) => {
 try {
    const employees = await Employee.find(); 
    return res.status(200).json({ data: employees });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};

module.exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Employee deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};

// Delete Manager
module.exports.deleteManager = async (req, res) => {
  try {
    await Manager.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Manager deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};