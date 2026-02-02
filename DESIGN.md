# Mini-Project 3 – Design & Requirements

## Project Overview

This project is a backend API that syncs data from an external API (Open Brewery DB) into a MongoDB database and exposes full CRUD operations on that data. The application follows an MVC-style architecture and is demonstrated using Swagger rather than a frontend UI.

---

## Requirements

- Fetch data from an external API on application startup
- Store external data in a database
- Database structure should mirror the external API structure
- Provide full CRUD (Create, Read, Update, Delete) operations
- Follow MVC architectural principles
- Demonstrate functionality using Swagger or Postman

---

## External API

**API Used:** Open Brewery DB
**Base URL:** https://api.openbrewerydb.org/v1/breweries

The API provides public brewery data such as name, type, location, and website.

---

## Data Model Design

### Brewery (MongoDB Collection)

Fields are mapped closely to the external API response:

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

---

## Application Architecture (MVC)

- **Models**
  - Mongoose schema defining the Brewery data structure
- **Controllers**
  - Handle request logic for CRUD operations
- **Routes**
  - Define API endpoints and connect them to controllers
- **Services**
  - Handle external API communication and database sync logic
- **Middleware**
  - Error handling and 404 handling

No frontend views are included; Swagger UI serves as the interface for demonstration.

---

## API Endpoints

### Sync

- `POST /sync`
  - Fetches brewery data from Open Brewery DB and upserts it into MongoDB

### Breweries (CRUD)

- `GET /breweries`
- `GET /breweries/:id`
- `POST /breweries`
- `PUT /breweries/:id`
- `DELETE /breweries/:id`

---

## Benefits of Using a Database

- Reduces dependency on the external API’s availability
- Improves performance by avoiding repeated external API calls
- Allows local modifications and extensions beyond the external API data
- Enables filtering and querying directly within the database

---

## Future Improvements

- Pagination for large datasets
- Scheduled background syncing
- Authentication and user-specific data
- User reviews or ratings for breweries
