const express = require("express");

const {
  addAdmin,
  loginAdmin,
  getAdmin,
  getAdminById,
} = require("../controllers/admin-controller");

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/", getAdmin);
adminRouter.get("/:id", getAdminById);

module.exports = adminRouter;
