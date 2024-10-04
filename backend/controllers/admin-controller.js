const Admin = require("../models/Admin");
const { json } = require("body-parser");
const bcrypt = require("bcryptjs");

const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let exisitingAdmin;
  try {
    exisitingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (exisitingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  try {
    const admin = new Admin({ email, password: hashedPassword });
    const response = await admin.save();
    console.log("Admin is updated");
    res.status(200).json({ response: response });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    console.log(err);
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim === "" && !password && password.trim === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let exisitingAdmin;
  try {
    exisitingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!exisitingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    exisitingAdmin.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res.status(200).json({ message: "Authentication Complete" });
};

const getAdmin = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return console.log(err);
  }
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ admins });
};

const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  try {
    admin = await Admin.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin });
};

module.exports = { addAdmin, loginAdmin, getAdmin, getAdminById };
