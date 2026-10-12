require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movies");
const recommendationRoutes = require("./routes/recommendations");
const predictionRoutes = require("./routes/predictions");
const app = express();
const PORT = process.env.PORT || 5000;
app.locals.dbConnected = false;
app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",").map(s => s.trim()) : true }));
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok", database: app.locals.dbConnected ? "connected" : "demo mode" }));
app.use("/api/movies", movieRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/predictions", predictionRoutes);
app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ message: "Something went wrong on the server." }); });
async function start() {
 if (process.env.MONGODB_URI) {
  try { await mongoose.connect(process.env.MONGODB_URI); app.locals.dbConnected = true; console.log("MongoDB connected"); }
  catch (error) { console.error("MongoDB connection failed; continuing with demo data:", error.message); }
 } else console.log("MONGODB_URI not set; using demo data");
 app.listen(PORT, () => console.log("CineMind API listening on port " + PORT));
}
start();