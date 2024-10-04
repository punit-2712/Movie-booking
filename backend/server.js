const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const adminRouter = require("./routes/admin-routes");
const userRouter = require("./routes/user-routes");
const movieRouter = require("./routes/movie-routes");
const bookingRouter = require("./routes/booking-routes");

app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log("Server is running");
});
