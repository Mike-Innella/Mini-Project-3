# East Coast Breweries – Frontend

## Overview

React + Vite frontend for managing the brewery dataset synced from Open Brewery DB. Provides search, pagination, and full CRUD operations against the backend API.

## Tech Stack

- Vite + React (JavaScript)
- Material UI (MUI)
- Fetch API

## Getting Started

```
npm install
npm run dev
```

The app expects the backend at `http://localhost:3000`.

## Environment

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:3000
```

## Features

- Server-side search via `q`
- Server-side pagination (50 per page)
- Create/Edit/Delete breweries
- Manual sync trigger
- Toasts and loading states

## Scripts

- `npm run dev` – start the frontend
- `npm run dev:all` – start frontend + backend
