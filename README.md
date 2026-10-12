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
3. Set `MONGODB_URI` to a local MongoDB or MongoDB Atlas connection string (required for registration and login).
4. Set `JWT_SECRET` to a private random secret at least 32 characters long.
5. Start the API in terminal 1: `npm run dev:server`
6. Start the UI in terminal 2: `npm run dev:client`
7. Open `http://localhost:5173`.

API routes: `GET /api/health`, `GET /api/movies`, `GET /api/movies/:id`, `POST /api/recommendations`, and `POST /api/predictions`.

**Note:** Match scores and rating estimates are demonstration heuristics, not trained AI/ML predictions. A real predictive model needs a dataset, training, and evaluation. Posters load from TMDB image URLs; this project is not affiliated with TMDB.

## Deployment
Deploy the React client and Express API as separate services. Set `VITE_API_URL` in the client environment to the deployed API base URL (ending in `/api`), and set `MONGODB_URI` and `CLIENT_URL` on the backend. Never commit secrets.


## User accounts and protected features
- Public visitors see the CineMind welcome page and can choose **Log in** or **Create account**.
- Register/login uses MongoDB user records, bcrypt password hashing, and a signed JWT session.
- Movie discovery, recommendations, and rating prediction API endpoints require a valid login token.
- Configure `MONGODB_URI` and a private `JWT_SECRET` (at least 32 random characters) in the backend environment. Never commit real secrets.
- Set `VITE_API_URL` in Vercel to the deployed backend API URL ending in `/api`. The backend must be deployed separately and its `CLIENT_URL` must include your deployed frontend origin.
