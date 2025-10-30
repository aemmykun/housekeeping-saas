# API Documentation

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://api.yourdomain.com/api`

## Authentication
All API requests (except health check) require authentication using Firebase JWT tokens.

Include the token in the Authorization header:
```
Authorization: Bearer <your-firebase-token>
```

## Endpoints

### Health Check
Check API server status.

**GET** `/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 1234.56,
  "environment": "development"
}
```

---

## Authentication Endpoints

### Verify Token
Verify if the provided token is valid.

**POST** `/api/auth/verify`

**Headers:**
- `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "uid": "user123",
    "email": "user@example.com",
    "role": "staff"
  }
}
```

### Get Current User
Get the authenticated user's profile.

**GET** `/api/auth/me`

**Headers:**
- `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "user123",
    "email": "user@example.com",
    "displayName": "John Doe",
    "role": "staff"
  }
}
```

### Create User Profile
Create a user profile after Firebase authentication.

**POST** `/api/auth/register`

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "email": "user@example.com",
  "displayName": "John Doe",
  "role": "staff"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "user123",
    "email": "user@example.com",
    "displayName": "John Doe",
    "role": "staff"
  }
}
```

---

## Task Endpoints

### Get All Tasks
Retrieve all tasks with optional filters.

**GET** `/api/tasks`

**Query Parameters:**
- `status` (optional): Filter by status (`todo`, `in-progress`, `done`)
- `assignedTo` (optional): Filter by assigned user ID
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "task123",
      "title": "Clean kitchen",
      "description": "Deep clean the kitchen area",
      "status": "todo",
      "priority": "high",
      "createdBy": "user123",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Task by ID
Retrieve a specific task.

**GET** `/api/tasks/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task123",
    "title": "Clean kitchen",
    "description": "Deep clean the kitchen area",
    "status": "todo",
    "priority": "high",
    "createdBy": "user123",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Task
Create a new task.

**POST** `/api/tasks`

**Body:**
```json
{
  "title": "Clean kitchen",
  "description": "Deep clean the kitchen area",
  "status": "todo",
  "priority": "high",
  "assignedTo": "user456",
  "dueDate": "2024-01-15T00:00:00.000Z",
  "tags": ["cleaning", "kitchen"],
  "estimatedHours": 2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task123",
    "title": "Clean kitchen",
    "description": "Deep clean the kitchen area",
    "status": "todo",
    "priority": "high",
    "assignedTo": "user456",
    "createdBy": "user123",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "tags": ["cleaning", "kitchen"],
    "estimatedHours": 2
  }
}
```

### Update Task
Update an existing task.

**PUT** `/api/tasks/:id`

**Body:**
```json
{
  "status": "in-progress",
  "actualHours": 1.5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task123",
    "title": "Clean kitchen",
    "status": "in-progress",
    "actualHours": 1.5,
    "updatedAt": "2024-01-01T01:30:00.000Z"
  }
}
```

### Delete Task
Delete a task.

**DELETE** `/api/tasks/:id`

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Get Tasks by User
Get all tasks assigned to a specific user.

**GET** `/api/tasks/user/:userId`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "task123",
      "title": "Clean kitchen",
      "assignedTo": "user456",
      "status": "todo"
    }
  ]
}
```

---

## User Endpoints

### Get All Users
Get all users (admin/manager only).

**GET** `/api/users`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "uid": "user123",
      "email": "user@example.com",
      "displayName": "John Doe",
      "role": "staff"
    }
  ]
}
```

### Get User by ID
Get a specific user's profile.

**GET** `/api/users/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "user123",
    "email": "user@example.com",
    "displayName": "John Doe",
    "role": "staff"
  }
}
```

### Update User Profile
Update a user's profile.

**PUT** `/api/users/:id`

**Body:**
```json
{
  "displayName": "John Smith",
  "role": "manager"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "user123",
    "email": "user@example.com",
    "displayName": "John Smith",
    "role": "manager"
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## Rate Limiting
Currently, there are no rate limits implemented. Consider implementing rate limiting for production use.

## Pagination
Pagination is not yet implemented. All endpoints return complete result sets. Consider implementing pagination for large datasets.
