const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports = async function requireAuth(req, res, next) {
 const header = req.headers.authorization || "";
 const token = header.startsWith("Bearer ") ? header.slice(7) : "";
 if (!token) return res.status(401).json({ message: "Please log in to access this feature." });
 try {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) return res.status(503).json({ message: "Authentication is not configured on the server." });
  const payload = jwt.verify(token, process.env.JWT_SECRET, { issuer: "cinemind-api", audience: "cinemind-client" });
  const user = await User.findById(payload.sub).select("_id name email");
  if (!user) return res.status(401).json({ message: "Your account was not found. Please log in again." });
  req.user = user;
  next();
 } catch (_error) { return res.status(401).json({ message: "Your session has expired. Please log in again." }); }
};
