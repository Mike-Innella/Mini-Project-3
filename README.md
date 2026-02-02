# Mini-Project 3 – Brewery Sync (Backend + Frontend)

## Overview

A full-stack mini project that syncs brewery data from Open Brewery DB into MongoDB and provides a React (Vite) admin UI for browsing, searching, and CRUD operations. The backend follows MVC architecture and exposes a Swagger UI for API documentation.

## Current Scope

- **Sync source:** Open Brewery DB
- **Dataset:** US East Coast breweries only
- **Sync cap:** Up to 10,000 records
- **Pagination:** Server-side (`limit` + `page`)
- **Search:** Server-side (`q`)

## Repo Structure

```
backend/   Express + MongoDB API
frontend/  Vite + React UI
```

## Getting Started

### 1) Backend

```
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:3000` and auto-syncs on startup (non-blocking).

### 2) Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

### Optional: Run both

```
cd frontend
npm run dev:all
```

## API Endpoints

- `GET /breweries?limit=50&page=1&q=search`
- `GET /breweries/:id`
- `POST /breweries`
- `PUT /breweries/:id`
- `DELETE /breweries/:id`
- `POST /sync`

## Frontend Features

- East Coast breweries list
- Server-side pagination (50 per page)
- Server-side search
- Create/Edit/Delete breweries
- Manual sync button
- Loading states and toast notifications

## Notes

- Local breweries created in the UI do **not** have `externalId`.
- Sync runs with rate-limit backoff and may take time for large datasets.
- CORS is enabled in the backend for local development.
