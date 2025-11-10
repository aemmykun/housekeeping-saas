# Project Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         End Users                                │
│                    (Web Browsers)                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Angular Frontend                              │
│                   (http://localhost:4200)                        │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Components  │  │   Services   │  │    Guards    │          │
│  │              │  │              │  │              │          │
│  │ - Kanban     │  │ - Auth       │  │ - Auth       │          │
│  │ - Login      │  │ - Task       │  │   Guard      │          │
│  │ - Dashboard  │  │ - Firebase   │  │              │          │
│  │ - Header     │  │              │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
└───────────────┬───────────────────────────┬─────────────────────┘
                │                           │
                │ REST API                  │ Firebase SDK
                │ (HTTP)                    │ (Direct)
                ▼                           ▼
┌───────────────────────────┐   ┌─────────────────────────────────┐
│  Node.js/Express Backend  │   │      Firebase Services          │
│  (http://localhost:3000)  │   │                                 │
│                           │   │  ┌──────────────────────────┐  │
│  ┌────────────────────┐  │   │  │   Authentication         │  │
│  │   Controllers      │  │   │  │  - Email/Password        │  │
│  │  - Task           │  │   │  │  - Google Sign-In        │  │
│  │  - Auth           │  │   │  │  - JWT Tokens            │  │
│  └────────────────────┘  │   │  └──────────────────────────┘  │
│                           │   │                                 │
│  ┌────────────────────┐  │   │  ┌──────────────────────────┐  │
│  │   Services         │◄─┼───┼──┤   Firestore Database     │  │
│  │  - Firebase        │  │   │  │  - tasks collection      │  │
│  └────────────────────┘  │   │  │  - users collection      │  │
│                           │   │  └──────────────────────────┘  │
│  ┌────────────────────┐  │   │                                 │
│  │   Middleware       │  │   │  ┌──────────────────────────┐  │
│  │  - Auth            │  │   │  │   Admin SDK              │  │
│  │  - Error Handler   │  │   │  │  - Token Verification    │  │
│  └────────────────────┘  │   │  │  - Server-side Auth      │  │
│                           │   │  └──────────────────────────┘  │
└───────────────────────────┘   └─────────────────────────────────┘
```

## Data Flow

### User Authentication Flow

```
User Action (Login)
    │
    ▼
Login Component
    │
    ▼
Auth Service (Frontend)
    │
    ▼
Firebase Auth (Client SDK)
    │
    ├─── Success ───► User receives ID Token
    │                       │
    │                       ▼
    │                Auth Guard allows access
    │                       │
    │                       ▼
    │                Dashboard Component
    │
    └─── Failure ───► Error Message Displayed
```

### Task Management Flow

```
User Action (Create/Update Task)
    │
    ▼
Kanban Board Component
    │
    ▼
Task Service (Frontend)
    │
    ├─── Real-time Mode ────► Firestore (Direct)
    │                              │
    │                              ▼
    │                         Updates Collection
    │                              │
    │                              ▼
    │                         Triggers Observable
    │                              │
    │                              ▼
    │                         UI Updates Automatically
    │
    └─── API Mode ──────────► Backend API (Optional)
                                   │
                                   ▼
                              Auth Middleware
                                   │
                                   ▼
                              Task Controller
                                   │
                                   ▼
                              Firebase Service
                                   │
                                   ▼
                              Firestore Database
```

## Component Hierarchy

```
App Component
│
├── Login Component
│   ├── Email/Password Form
│   ├── Google Sign-In Button
│   └── Registration Form
│
└── Dashboard Component (Protected)
    │
    ├── Header Component
    │   ├── Logo
    │   ├── User Menu
    │   └── Logout Button
    │
    └── Kanban Board Component
        │
        ├── Column: To Do
        │   └── Task Cards
        │
        ├── Column: In Progress
        │   └── Task Cards
        │
        └── Column: Done
            └── Task Cards

Task Card Component (Draggable)
├── Title
├── Description
├── Priority Badge
├── Assigned User
├── Due Date
└── Actions Menu (Edit/Delete)
```

## API Endpoints

### Authentication Endpoints
```
POST   /api/auth/verify          # Verify Firebase token
GET    /api/auth/user            # Get current user info (protected)
```

### Task Endpoints (All Protected)
```
GET    /api/tasks                # Get all tasks
GET    /api/tasks/:id            # Get single task
POST   /api/tasks                # Create new task
PUT    /api/tasks/:id            # Update task
PATCH  /api/tasks/:id/status     # Update task status (for Kanban)
DELETE /api/tasks/:id            # Delete task
```

## Data Models

### Task Model
```typescript
interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  assignedToName?: string;
  createdBy: string;
  createdByName?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}
```

### User Model
```typescript
interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: Date;
}
```

## Security Architecture

### Frontend Security
```
┌──────────────────────────────────┐
│   Route Guards                   │
│   - Checks authentication status │
│   - Redirects to login if needed │
└──────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│   Firebase Auth                  │
│   - Client-side authentication   │
│   - ID Token generation          │
└──────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│   HTTP Interceptor (if needed)   │
│   - Attaches token to requests   │
└──────────────────────────────────┘
```

### Backend Security
```
┌──────────────────────────────────┐
│   Helmet.js                      │
│   - Security headers             │
└──────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│   CORS Middleware                │
│   - Allowed origins              │
└──────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│   Auth Middleware                │
│   - Verifies Firebase tokens     │
│   - Extracts user info           │
└──────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│   Firestore Security Rules       │
│   - Server-side data validation  │
└──────────────────────────────────┘
```

### Firestore Security Rules
```javascript
// Users can only read/write their own data
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

// Authenticated users can read all tasks
// Only creators/assignees can update
// Only creators can delete
match /tasks/{taskId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null 
    && request.resource.data.createdBy == request.auth.uid;
  allow update: if request.auth != null 
    && (resource.data.createdBy == request.auth.uid 
        || resource.data.assignedTo == request.auth.uid);
  allow delete: if request.auth != null 
    && resource.data.createdBy == request.auth.uid;
}
```

## Technology Stack Details

### Frontend Stack
```
Angular 16+
├── @angular/material      # UI components
├── @angular/cdk          # Drag-and-drop
├── @angular/fire         # Firebase integration
├── RxJS                  # Reactive programming
├── TypeScript            # Type safety
└── SCSS                  # Styling
```

### Backend Stack
```
Node.js
├── Express.js            # Web framework
├── Firebase Admin SDK    # Backend Firebase
├── Helmet               # Security headers
├── CORS                 # Cross-origin support
├── Morgan               # HTTP logging
└── dotenv               # Environment config
```

### Database & Services
```
Firebase Platform
├── Firestore            # NoSQL database
├── Authentication       # User management
├── Hosting (optional)   # Frontend deployment
└── Cloud Functions      # Serverless (future)
```

## Deployment Architecture

### Development
```
localhost:4200 (Frontend) ──► localhost:3000 (Backend) ──► Firebase
```

### Production
```
CDN/Hosting (Frontend) ──► API Server (Backend) ──► Firebase
     │                           │
     │                           └─── Docker Container
     │                           └─── Cloud Run / Heroku / VPS
     │
     └─── Firebase Hosting
     └─── Netlify / Vercel
```

## Real-time Synchronization

```
User A makes change
    │
    ▼
Firestore updates
    │
    ├──► Observable in User A's browser (updates UI)
    │
    ├──► Observable in User B's browser (updates UI)
    │
    └──► Observable in User C's browser (updates UI)
```

This real-time sync is achieved through Firestore's built-in listeners:
```typescript
this.taskService.getTasks().subscribe(tasks => {
  // UI automatically updates when any user makes changes
  this.organizeTasks(tasks);
});
```

## Scalability Considerations

1. **Frontend**: Static files served via CDN
2. **Backend**: Stateless API can be horizontally scaled
3. **Database**: Firebase Firestore scales automatically
4. **Authentication**: Firebase Auth handles millions of users
5. **Caching**: Implement Redis for API responses (future enhancement)

## Performance Optimizations

1. **Lazy Loading**: Load Angular modules on demand
2. **Code Splitting**: Separate vendor and application bundles
3. **Tree Shaking**: Remove unused code
4. **Gzip Compression**: Reduce bundle sizes
5. **Service Workers**: Offline support (future enhancement)
6. **Firestore Indexes**: Optimize queries
7. **CDN**: Serve static assets from edge locations
