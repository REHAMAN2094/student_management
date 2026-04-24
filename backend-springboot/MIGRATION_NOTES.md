# Node.js to Spring Boot Migration Notes

This project is a functional migration of `backend` (Node.js/Express + Mongoose) into Spring Boot + Spring Data MongoDB.

## Endpoint parity

- `GET /students`  
  Preserved query behavior:
  - `page` default `1`
  - `limit` default `5`
  - `sortBy` default `name`
  - `sortOrder` default `asc`
  Preserved response shape:
  - `students`
  - `totalPages`
  - `currentPage`

- `POST /students`  
  Preserved status/behavior:
  - Returns `201` with created student JSON

- `PUT /students/{id}`  
  Preserved behavior:
  - Returns updated student JSON
  - Returns `null` body when id does not exist (same behavior as Mongoose `findByIdAndUpdate`)

- `DELETE /students/{id}`  
  Preserved behavior:
  - Returns deleted student JSON
  - Returns `null` body when id does not exist

- `POST /auth/register`  
  Preserved behavior:
  - Bcrypt hash password
  - Return `201` with `{ "message": "User registered" }`

- `POST /auth/login`  
  Preserved behavior:
  - Return `400` `{ "message": "Invalid credentials" }` for username/password mismatch
  - Return `{ "token": "..." }` on success
  - Token payload contains `id` and expires in 1 hour

- `GET /auth`  
  Added protected route equivalent to JWT middleware usage in original auth routes.

## Error handling parity

- Node code returns `400` with `{ "message": err.message }` in most catch blocks.
- Spring migration uses `GlobalExceptionHandler` to return `400` with the same shape.

## Data model parity

- `Student`: `name` (required), `age` (required), `course` (required)
- `User`: `username` (required, unique), `password` (required, hashed)

## Environment parity

- `PORT` -> server port (default `5000`)
- `MONGO_URI` -> MongoDB URI
- `JWT_SECRET` -> JWT signing key
