const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
  email: {
    type: String,
    uniquie: true,
    required: true,
  },
  password: {
    type: String,
    uniquie: true,
    minLength: 6,
  },
  addedMovies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const admin = mongoose.model("admin", adminschema);

module.exports = admin;
