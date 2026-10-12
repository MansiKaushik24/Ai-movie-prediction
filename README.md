# AI Movie Prediction & Recommendation — CineMind AI

A responsive movie-discovery website built with React, Express, Node.js, and optional MongoDB.

## Features
- Responsive dark-themed movie discovery interface
- Movie search, genre filters, sorting, detail popups, and watchlist
- Express REST API for movie listings, recommendations, and rating estimates
- Demo catalogue means the website can run without credentials or MongoDB

## Tech stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose (optional for demo mode)

## Run locally
Requires Node.js 20+.

1. In the repository root run: `npm run install:all`
2. Copy `server/.env.example` to `server/.env`.
3. Optional: set `MONGODB_URI` to a local MongoDB or MongoDB Atlas connection string.
4. Start the API in terminal 1: `npm run dev:server`
5. Start the UI in terminal 2: `npm run dev:client`
6. Open `http://localhost:5173`.

API routes: `GET /api/health`, `GET /api/movies`, `GET /api/movies/:id`, `POST /api/recommendations`, and `POST /api/predictions`.

**Note:** Match scores and rating estimates are demonstration heuristics, not trained AI/ML predictions. A real predictive model needs a dataset, training, and evaluation. Posters load from TMDB image URLs; this project is not affiliated with TMDB.

## Deployment
Deploy the React client and Express API as separate services. Set `VITE_API_URL` in the client environment to the deployed API base URL (ending in `/api`), and set `MONGODB_URI` and `CLIENT_URL` on the backend. Never commit secrets.
