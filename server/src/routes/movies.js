const express = require("express");
const Movie = require("../models/Movie");
const demoMovies = require("../data/movies");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

router.get("/", async (req, res, next) => {
 try {
  const search = String(req.query.search || "").slice(0, 80);
  const genre = String(req.query.genre || "");
  const sort = String(req.query.sort || "");
  const filter = {};
  if (genre && genre !== "All") filter.genre = new RegExp("^" + genre.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "i");
  if (search) filter.title = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  let items = [];
  if (req.app.locals.dbConnected) {
   let query = Movie.find(filter);
   if (sort === "rating") query = query.sort({ rating: -1 });
   if (sort === "newest") query = query.sort({ year: -1 });
   items = await query.limit(100).lean();
  }
  if (!items.length) {
   items = demoMovies.filter(m => (!genre || genre === "All" || m.genre.toLowerCase() === genre.toLowerCase()) && (!search || m.title.toLowerCase().includes(search.toLowerCase())));
   if (sort === "rating") items.sort((a,b) => b.rating-a.rating);
   if (sort === "newest") items.sort((a,b) => b.year-a.year);
  }
  res.json({ count: items.length, source: req.app.locals.dbConnected && items.length ? "mongodb" : "demo", movies: items });
 } catch (error) { next(error); }
});
router.get("/:id", async (req, res, next) => {
 try {
  const item = req.app.locals.dbConnected && /^[a-f0-9]{24}$/i.test(req.params.id) ? await Movie.findById(req.params.id).lean() : null;
  const movie = item || demoMovies.find(m => String(m.id) === req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json({ movie });
 } catch (error) { next(error); }
});
module.exports = router;