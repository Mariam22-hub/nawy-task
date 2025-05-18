# Nawy Real Estate Listings Project

This project is a full-stack real estate listings application with a **backend API**, a **frontend React/Next.js app**, and integrations like **EdgeStore** for image storage. The entire system is containerized using **Docker Compose** for easy local development and deployment.

---

## Project Overview

- **Backend**: Node.js + Express + Typescript server exposing REST APIs to create, fetch, and retrieve real estate listings. Uses MongoDB as the database.
- **Frontend**: Next.js React app providing UI to list properties, add new listings with image upload, and view listing details.
- **Image Storage**: Uses EdgeStore service to upload and store property images securely.
- **API Validation**: Input validation on backend using DTO schemas and middleware.
- **Documentation**: Swagger UI is provided for API documentation and testing.

---

## Architecture

Frontend (Next.js app) <----> Backend (Express Typescript) <----> MongoDB
(With EdgeStore for cloud image storage)
## Prerequisites

- Docker & Docker Compose installed on your machine
- (Optional) MongoDB running locally or use the bundled MongoDB container
- Access to EdgeStore service (with provided access keys)

---

## Environment Variables Setup

You need to create two `.env` files inside the root directory for backend and frontend services respectively.

### Backend `.env`

Create a file named `.env` inside `next-home-backend` folder:

```env
# MongoDB connection string
# Use local MongoDB:
MONGO_URI=mongodb://mongo:27017/nawy

# Backend server port
PORT=8000
```

### Frontend `.env`

Create a file named `.env` inside `next-home-frontend` folder:
Create an account at [https://edgestore.dev/](EdgeStore) -> Create a new project -> Get the access & secret keys
```env
NEXT_PUBLIC_API_URL=http://backend:8000/api
NEXT_PUBLIC_LISTINGS_LIMIT=6

# EdgeStore credentials for image upload service
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```

### Running the Project with Docker Compose
The entire stack (backend API, frontend app, and MongoDB) is wrapped inside Docker Compose for convenience.
Make sure you have the .env files created as described above.
Run the following command from the root of your project (The root directory of both frontend and backend directories:

```
docker-compose up 
```
This will:
Build and start the backend server on port 8000
Start the frontend app (On port `3000`)
Start MongoDB container (On url `mongodb://mongo:27017/nawy`) 

Access the frontend UI at: `http://localhost:3000`
Backend API base URL: http://localhost:8000/api/v1 (All apis are prefixed by `api/v1`)


### Backend API Routes

| Method | Route               | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/api/v1/listings/`    | Create a new listing            |
| GET    | `/api/v1/listings/`    | Get all listings               |
| GET    | `/api/v1/listings/:id` | Get listing details by UUID      |

#### API Validation
Backend uses middleware validation (Zod) with ListingSchemaDTO to ensure request data correctness.

### Swagger API Documentation
You can access the Swagger UI to explore and test backend API endpoints at:
`http://localhost:8000/api-docs`

### Notes
- Image uploads are handled by the frontend using the EdgeStore service, credentials provided via env variables.
- Listings images URLs are stored in the MongoDB database.
- The frontend limits the number of listings per page via NEXT_PUBLIC_LISTINGS_LIMIT.
- You can customize MongoDB URI and ports in the .env files as needed.
- If running MongoDB locally, ensure it's accessible at the URI you configure.
