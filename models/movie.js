const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must provide a movie title"],
    trim: true,
    maxlength: [20, "title cannot be more than 20 characters"],
  },
  budget: {
    type: Number,
  },
  release_date: {
    type: Date,
    required: true,
  },
  revenue: {
    type: Number,
  },
  vote_average: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
