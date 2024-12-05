import { Schema, model } from "mongoose";

const movieSchema = new Schema({
    plot: { type: String },
    genres: { type: Array },
    runtime: { type: Number },
    rated: { type: String },
    cast: { type: Array },
    // eslint-disable-next-line camelcase
    num_mflix_comments: { type: Number },
    poster: { type: String },
    title: { type: String, index: { name: "idx_title" } }, // Índice simple
    fullplot: { type: String },
    languages: { type: Array },
    released: { type: Date },
    directors: { type: Array },
    writers: { type: Array },
    awards: { type: Object },
    lastupdated: { type: String },
    year: { type: Number },
    imdb: { type: Object },
    countries: { type: Array },
    type: { type: String },
});

const MovieModel = model("movies", movieSchema);

export default MovieModel;