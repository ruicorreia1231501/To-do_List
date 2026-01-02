# Full Stack To-do List

Repository following the It's Possible Tech interview challenge.

# Installing and Running

## Prerequisites
- Docker and Docker Compose installed on your system

## Getting Started

### 1. Start the container with Docker Compose
```bash
docker compose up
```

This command will:
- Start MongoDB container
- Build and start the backend server
- Build and start the frontend app

### 2. Access the application
- **Backend API**: http://localhost:4200
- **Health Check**: http://localhost:4200/health

### 3. Stop the application
```bash
docker compose down
```

## Environment Variables

The following environment variables are configured in `.env`:
- `PORT`: 4200
- `MONGO_URI`: mongodb://admin:password@mongodb:27017/todo?authSource=admin

You can modify these values in the `.env` file if needed.

# API Documentation

See these links for the full documentation:
- [Backend Documentation](./backend.md)
- [Frontend Documentation](./frontend.md)