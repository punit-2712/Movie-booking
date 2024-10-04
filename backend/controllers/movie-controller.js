const Movie = require("../models/Movie");

const getAllMovies = async (req, res, next) => {
  let movie;
  try {
    movie = await Movie.find();
  } catch (err) {
    return console.log(err);
  }
  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ movie });
};

const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }

  return res.status(200).json({ movie });
};

const addMovie = async (req, res, next) => {
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;

  if (
    !title &&
    title.trim === "" &&
    !description &&
    description.trim === "" &&
    !releaseDate &&
    releaseDate.trim === "" &&
    !posterUrl &&
    posterUrl.trim === "" &&
    !featured &&
    featured.trim === "" &&
    !actors &&
    actors.trim === ""
  ) {
    return res.status(402).json({ message: "Invalid Inputs" });
  }
  let response;
  try {
    response = new Movie({
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      posterUrl,
      title,
    });
    await response.save();
  } catch (err) {
    return console.log(err);
  }

  if (!response) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ response });
};

module.exports = { getAllMovies, getMovieById, addMovie };
