# Housekeeping SaaS Backend

Node.js/Express REST API with Firebase Admin SDK integration for the Housekeeping SaaS application.

## Features

- RESTful API endpoints for task management
- Firebase Authentication integration
- Firestore database operations
- JWT token verification
- CORS support
- Error handling middleware
- Security headers with Helmet
- Request logging with Morgan

## Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Firebase project with Admin SDK credentials

## Installation

```bash
cd backend
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update `.env` with your Firebase credentials:

### Option 1: Using Service Account JSON File
```env
PORT=3000
NODE_ENV=development
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
CORS_ORIGIN=http://localhost:4200
```

Then place your `firebase-service-account.json` file in the backend directory.

### Option 2: Using Environment Variables
```env
PORT=3000
NODE_ENV=development
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
CORS_ORIGIN=http://localhost:4200
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /health` - Check server status

### Authentication
- `POST /api/auth/verify` - Verify Firebase ID token
- `GET /api/auth/user` - Get current user info (requires authentication)

### Tasks
All task endpoints require authentication (Bearer token in Authorization header)

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete task

## Request/Response Examples

### Create Task
```bash
POST /api/tasks
Authorization: Bearer <firebase-id-token>
Content-Type: application/json

{
  "title": "Clean the kitchen",
  "description": "Deep clean all surfaces and appliances",
  "status": "todo",
  "priority": "high",
  "assignedTo": "user-uid",
  "assignedToName": "John Doe",
  "dueDate": "2024-01-15T10:00:00Z"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "task-id",
    "title": "Clean the kitchen",
    "description": "Deep clean all surfaces and appliances",
    "status": "todo",
    "priority": "high",
    "createdBy": "user-uid",
    "createdAt": "2024-01-10T08:30:00Z",
    "updatedAt": "2024-01-10T08:30:00Z"
  }
}
```

### Update Task Status
```bash
PATCH /api/tasks/:id/status
Authorization: Bearer <firebase-id-token>
Content-Type: application/json

{
  "status": "in-progress"
}
```

## Error Handling

All errors follow this format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── firebase.config.js      # Firebase initialization
│   ├── controllers/
│   │   ├── task.controller.js      # Task business logic
│   │   └── auth.controller.js      # Auth business logic
│   ├── middleware/
│   │   ├── auth.middleware.js      # JWT verification
│   │   └── error.middleware.js     # Error handling
│   ├── models/
│   │   └── task.model.js           # Task data model
│   ├── routes/
│   │   ├── task.routes.js          # Task endpoints
│   │   └── auth.routes.js          # Auth endpoints
│   ├── services/
│   │   └── firebase.service.js     # Firebase operations
│   └── server.js                   # Express app setup
├── .env.example                    # Environment variables template
├── package.json
└── README.md
```

## Security

- All API endpoints (except health check) require Firebase authentication
- CORS is configured to accept requests only from specified origins
- Helmet.js adds security headers
- Environment variables keep sensitive data secure

## Development

### Adding New Endpoints

1. Create controller function in `src/controllers/`
2. Add route in `src/routes/`
3. Import and use in `src/server.js`

Example:
```javascript
// In controller
async function myNewFunction(req, res, next) {
  try {
    // Your logic here
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

// In routes
router.get('/my-endpoint', myNewFunction);
```

## Testing

```bash
npm test
```

## Deployment

### Environment Variables for Production

Make sure to set these in your production environment:
- `NODE_ENV=production`
- `PORT` (if different from 3000)
- Firebase credentials
- `CORS_ORIGIN` (your production frontend URL)

### Docker Deployment (Optional)

Create a `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t housekeeping-api .
docker run -p 3000:3000 --env-file .env housekeeping-api
```

## Troubleshooting

### Firebase Admin initialization fails
- Verify service account JSON is valid and in the correct location
- Check that environment variables are properly set
- Ensure Firebase project has Firestore and Authentication enabled

### CORS errors
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- Ensure credentials are properly sent from frontend

### Port already in use
- Change `PORT` in `.env` file
- Kill the process using the port: `lsof -ti:3000 | xargs kill`

## License

MIT
