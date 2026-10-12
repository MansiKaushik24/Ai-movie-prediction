const express = require("express");
const router = express.Router();
// Demonstration heuristic only; replace with a trained and evaluated ML model for real predictions.
router.post("/", (req, res) => {
 const { genre, year, startingRating } = req.body || {};
 const allowed = ["Action","Adventure","Animation","Comedy","Drama","Horror","Romance","Sci-Fi","Thriller"];
 const y = Number(year), r = Number(startingRating);
 if (!allowed.includes(genre) || !Number.isInteger(y) || y < 1900 || y > 2035 || !Number.isFinite(r) || r < 0 || r > 10) {
  return res.status(400).json({ message: "Provide a valid genre, year (1900–2035), and starting rating (0–10)." });
 }
 const score = Math.max(4.2, Math.min(9.8, r + (y >= 2020 ? 0.4 : -0.2) + (["Sci-Fi","Drama","Thriller"].includes(genre) ? 0.3 : 0)));
 res.json({ genre, year: y, estimatedRating: Number(score.toFixed(1)), method: "demo-heuristic", disclaimer: "Illustrative estimate only; this is not a trained machine-learning model." });
});
module.exports = router;