const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
 externalId: { type: String, index: true },
 title: { type: String, required: true, trim: true },
 year: Number,
 genre: { type: String, index: true },
 rating: { type: Number, min: 0, max: 10, default: 0 },
 poster: String,
 description: String
}, { timestamps: true });
module.exports = mongoose.models.Movie || mongoose.model("Movie", movieSchema);