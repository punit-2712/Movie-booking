const express = require("express");
const {
  newBooking,
  getBookingsById,
  deleteBooking,
} = require("../controllers/booking-controller");
const bookingsRouter = express.Router();

bookingsRouter.get("/:id", getBookingsById);
bookingsRouter.post("/", newBooking);
bookingsRouter.delete("/delete/:id", deleteBooking);

module.exports = bookingsRouter;
