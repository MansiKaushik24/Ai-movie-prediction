const express = require("express");
const demoMovies = require("../data/movies");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
router.post("/", requireAuth, (req, res) => {
 const { genres = [], minRating = 0 } = req.body || {};
 const selected = Array.isArray(genres) ? genres.map(String) : [];
 const recommendations = demoMovies.filter(m => (!selected.length || selected.includes(m.genre)) && m.rating >= Number(minRating || 0))
  .map(m => ({ ...m, matchScore: Math.min(98, Math.round(m.rating * 8.2 + (selected.includes(m.genre) ? 10 : 0)) ) }))
  .sort((a,b) => b.matchScore-a.matchScore).slice(0,8);
 res.json({ recommendations, note: "Demo recommendations use genre and rating rules; they are not trained AI predictions." });
});
module.exports = router;