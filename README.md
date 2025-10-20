# Book Store

A simple Book Store application that provides CRUD operations for managing books. The app is provided with a Docker Compose setup and runs on port 3000 by default.

## Features

- Create, read, update and delete books
- Docker Compose for quick setup
- REST API (examples below)

## Prerequisites

- Docker (https://docs.docker.com/get-docker/)
- Docker Compose (v2 recommended)
- (Optional for local dev) Node.js and npm/yarn, or language runtime used by the project

## Quick start (Docker)

Run the app with Docker Compose:

```bash
docker-compose up --build
```

Access the app at: http://localhost:3000

Stop and remove containers:

```bash
docker-compose down
```

## Example API endpoints

(The exact routes may vary — check the source if different.)

- List books
  ```bash
  curl http://localhost:3000/books
  ```
- Get a book by id
  ```bash
  curl http://localhost:3000/books/<id>
  ```
- Create a book
  ```bash
  curl -X POST http://localhost:3000/books \
    -H "Content-Type: application/json" \
    -d '{"title":"Example","author":"Author","year":2024}'
  ```
- Update a book
  ```bash
  curl -X PUT http://localhost:3000/books/<id> \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated Title"}'
  ```
- Delete a book
  ```bash
  curl -X DELETE http://localhost:3000/books/<id>
  ```

## Local development

1. Install dependencies (example for Node projects)
   ```bash
   npm install
   ```
2. Run the app (example)
   ```bash
   npm start
   ```
3. Run tests (if present)
   ```bash
   npm test
   ```

If the project uses environment variables, create a `.env` file from `.env.example` and adjust values as needed.

## Project structure (example)

- src/ — application source
- routes/ or api/ — API route handlers
- models/ — data models
- docker-compose.yml — Docker Compose configuration
- Dockerfile — container image build
- tests/ — unit/integration tests

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes and open a pull request
4. Follow existing code style and add tests for new features where possible

## License

Add the appropriate license file (e.g., MIT) or update this section with the repo's license.

## Troubleshooting

- If the service does not start, check container logs:
  ```bash
  docker-compose logs -f
  ```
- If port 3000 is in use, stop the conflicting service or change the port in `docker-compose.yml`.

For more details, consult the project source files (entrypoint, server, routes) to confirm exact endpoints and setup steps.
