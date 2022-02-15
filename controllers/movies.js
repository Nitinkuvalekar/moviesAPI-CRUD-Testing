const Movie = require("../models/movie");
const asyncWrapper = require("../middleware/async");

const getAllMovies = asyncWrapper(async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json({ movies });
});

const createMovie = asyncWrapper(async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json({ movie });
});

const getMovie = asyncWrapper(async (req, res) => {
  const { id: movieID } = req.params;
  const movie = await Movie.findOne({ _id: movieID });
  if (!movie) {
    return res.status(404).json({ msg: `No movie with id : ${movieID}` });
  }
  res.status(200).json({ movie });
});

const updateMovie = asyncWrapper(async (req, res) => {
  const { id: movieID } = req.params;
  const movie = await Movie.findOneAndUpdate({ _id: movieID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!movie) {
    return res.status(404).json({ msg: `No movie with id : ${movieID}` });
  }
  res.status(200).json({ task });
});

const deleteMovie = asyncWrapper(async (req, res) => {
  const { id: movieID } = req.params;
  const movie = await Movie.findOneAndDelete({ _id: movieID });
  if (!movie) {
    return res.status(404).json({ msg: `No movie with id : ${movieID}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
};
