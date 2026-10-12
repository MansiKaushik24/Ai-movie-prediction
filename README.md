# AI Movie Prediction & Recommendation

A MERN-stack movie discovery application with genre/search filters, movie recommendations, and a prediction-style rating estimate.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose (optional until `MONGODB_URI` is configured)
- Movie metadata/posters: TMDB API (optional; configure `TMDB_API_KEY`)

## Run locally

1. Install Node.js 20+ and MongoDB, or use a MongoDB Atlas connection string.
2. Backend: `cd server && npm install && npm run dev`
3. Frontend in a second terminal: `cd client && npm install && npm run dev`
4. Copy `server/.env.example` to `server/.env` and configure values.

The app includes a small local demo catalogue so the UI can run without API keys. Prediction scores are illustrative estimates, not real-world guarantees.
