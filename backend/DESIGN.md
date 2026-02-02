# Mini-Project 3 – Design & Requirements (Backend)

## Project Overview

This backend API syncs brewery data from Open Brewery DB into MongoDB and exposes full CRUD operations. The app follows an MVC-style architecture and is demonstrated through Swagger and a connected React UI.

---

## Requirements (Implemented)

- Fetch data from an external API on application startup (non-blocking background sync)
- Store external data in MongoDB
- Database structure mirrors the external API where applicable
- Provide full CRUD (Create, Read, Update, Delete)
- Follow MVC architectural principles
- Demonstrate functionality via Swagger or frontend UI

---

## External API

**API Used:** Open Brewery DB
**Base URL:** https://api.openbrewerydb.org/v1

The API provides public brewery data such as name, type, location, and website.

---

## Data Model Design

### Brewery (MongoDB Collection)

| External API Field | MongoDB Field |
| ------------------ | ------------- |
| id                 | externalId    |
| name               | name          |
| brewery_type       | breweryType   |
| city               | city          |
| state              | state         |
| country            | country       |
| website_url        | websiteUrl    |

Additional MongoDB metadata (createdAt, updatedAt) is added automatically.

Local breweries created in the UI do not have an externalId.

---

## Application Architecture (MVC)

- **Models**
  - Mongoose schema defining Brewery data
- **Controllers**
  - Handle request logic for CRUD operations and pagination
- **Routes**
  - Define API endpoints and connect them to controllers
- **Services**
  - External API communication and sync logic (rate limit backoff)
- **Middleware**
  - Error handling and 404 handling

---

## Sync Strategy

- Sync runs on startup in the background (server starts immediately)
- Fetches breweries from Open Brewery DB and upserts by `externalId`
- Filters to East Coast states only
- Caps sync at 10,000 records (10 per page × 1,000 pages)
- Inserts/updates fields: name, type, city, state, country, website

---

## API Endpoints

### Sync

- `POST /sync`
  - Fetches brewery data from Open Brewery DB and upserts into MongoDB

### Breweries (CRUD + Pagination)

- `GET /breweries?limit=50&page=1&q=search`
- `GET /breweries/:id`
- `POST /breweries`
- `PUT /breweries/:id`
- `DELETE /breweries/:id`

`GET /breweries` returns:

```
{
  data: [...],
  page,
  pageSize,
  total,
  totalPages
}
```

---

## Benefits of Using a Database

- Reduces dependency on external API availability
- Improves performance and response times
- Allows local CRUD operations and extensions
- Enables query/pagination at the database layer

---

## Future Improvements

- Sync status endpoint and progress tracking
- Scheduled background syncing
- Server-side filters for state/city
- Authentication and user roles
- Favorites or ratings
