const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
router.use((_req, res, next) => {
 if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: "Account services are unavailable because the database is not connected." });
 next();
});
function issueToken(user) {
 if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) { const error = new Error("Server authentication is not configured. Set JWT_SECRET to a random secret of at least 32 characters."); error.status = 503; throw error; }
 return jwt.sign({ sub: String(user._id) }, process.env.JWT_SECRET, { expiresIn: "7d", issuer: "cinemind-api", audience: "cinemind-client" });
}
function publicUser(user) { return { id: String(user._id), name: user.name, email: user.email }; }
router.post("/register", async (req, res, next) => {
 try {
  const name = String(req.body?.name || "").trim(), email = String(req.body?.email || "").trim().toLowerCase(), password = String(req.body?.password || "");
  if (name.length < 2 || name.length > 60) return res.status(400).json({ message: "Name must be between 2 and 60 characters." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({ message: "Enter a valid email address." });
  if (password.length < 8 || password.length > 72) return res.status(400).json({ message: "Password must be 8 to 72 characters long." });
  if (await User.findOne({ email })) return res.status(409).json({ message: "An account with this email already exists. Please log in." });
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
  return res.status(201).json({ token: issueToken(user), user: publicUser(user) });
 } catch (error) { if (error.code === 11000) return res.status(409).json({ message: "An account with this email already exists. Please log in." }); next(error); }
});
router.post("/login", async (req, res, next) => {
 try {
  const email = String(req.body?.email || "").trim().toLowerCase(), password = String(req.body?.password || "");
  if (!email || !password) return res.status(400).json({ message: "Enter your email and password." });
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: "Incorrect email or password." });
  return res.json({ token: issueToken(user), user: publicUser(user) });
 } catch (error) { next(error); }
});
router.get("/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));
module.exports = router;
