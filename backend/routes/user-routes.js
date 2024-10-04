const express = require("express");
const {
  getBookingsOfUser,
  login,
  deleteUser,
  updateUser,
  singup,
  getUserById,
  getAllUsers,
} = require("../controllers/user-controller");

const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", singup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsOfUser);

module.exports = userRouter;
