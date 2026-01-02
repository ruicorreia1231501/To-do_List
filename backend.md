# Backend Documentation

This document outlines the backend API development and implementation details built throughout the project.

## 1. Endpoint Definition

| Method | URI          | Action                          |
| ------ | ------------ | ------------------------------- |
| GET    | `/tasks`     | List tasks                      |
| GET    | `/tasks/:id` | Get task                        |
| POST   | `/tasks`     | Create task                     |
| PUT    | `/tasks/:id` | Edit task                       |
| PATCH  | `/tasks/:id` | Partial update (e.g: completed) |
| DELETE | `/tasks/:id` | Delete task                     |


## 2. Model Definition

```javascript
Task {
    _id: ObjectId,
    title: String (required),
    description: String (optional),
    targetDate: Date (optional),
    priority: Integer (optional, 1-5),
    completed: Boolean (default: false),
    createdDate: Date (auto-generated),
    updatedDate: Date (auto-generated)
}
```

## 3. Data Validations

### Validation Rules

The API enforces the following validation rules through Express functions as **middleware**:

#### Title
- **Required**: Yes
- **Type**: String
- **Length**: 1-200 characters
- **Rules**: Cannot be empty and is automatically trimmed

#### Description
- **Required**: No
- **Type**: String
- **Length**: Max 1000 characters
- **Rules**: Automatically trimmed

#### Priority
- **Required**: No
- **Type**: Integer
- **Range**: 1-5
- **Rules**: Only valid values are 1, 2, 3, 4, or 5

#### Target Date
- **Required**: No
- **Type**: Date
- **Format**: Valid <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601</a> date string (e.g., "2026-01-15")

#### Completed
- **Required**: No
- **Type**: Boolean
- **Default**: false
- **Values**: true or false

### Validation Errors

When validation fails, the API returns a 400 Bad Request with error messages:

```json
{
  "message": "Title must not exceed 200 characters"
}
```

or for multiple errors:

```json
{
  "message": "Priority must be an integer between 1 and 5, Title cannot be empty"
}
```

### Example: Invalid Request

```bash
curl -X POST http://localhost:4200/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "",
    "priority": 10
  }'
```

Response (400 Bad Request):
```json
{
  "message": "Title cannot be empty, Priority must be an integer between 1 and 5"
}
```

## 4. Example Requests

### Create a Task
```bash
curl -X POST http://localhost:4200/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Docker",
    "description": "Docker and Docker Compose basics",
    "priority": 3,
    "targetDate": "2026-01-15"
  }'
```

### Get All Tasks
```bash
curl http://localhost:4200/tasks
```

### Get a Single Task
```bash
curl http://localhost:4200/tasks/{taskId}
```

### Update a Task (Full Update)
```bash
curl -X PUT http://localhost:4200/tasks/{taskId} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Docker",
    "description": "Docker and Docker Compose advanced",
    "priority": 4,
    "completed": false
  }'
```

### Partial Update a Task (mark as complete)
```bash
curl -X PATCH http://localhost:4200/tasks/{taskId} \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### Delete a Task
```bash
curl -X DELETE http://localhost:4200/tasks/{taskId}
```

## 5. Health Check

```bash
curl http://localhost:4200/health
```

Response:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```


