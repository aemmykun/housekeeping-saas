# Architecture Documentation

## Overview

The Housekeeping SaaS application is a full-stack web application built with modern technologies to manage housekeeping tasks using a Kanban board interface. The architecture follows a clean separation of concerns with a frontend Angular application and a backend Express API server, both communicating through RESTful APIs and using Firebase for authentication and data storage.

## Technology Stack

### Frontend
- **Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: SCSS
- **State Management**: RxJS (Observables, BehaviorSubjects)
- **Authentication**: Firebase Authentication SDK
- **Database**: Firebase Firestore SDK

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: Firebase Admin SDK
- **Database**: Firebase Firestore (via Admin SDK)
- **Security**: Helmet, CORS

### Infrastructure
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Authentication
- **Hosting**: Configurable (supports Docker)
- **API Protocol**: REST

## System Architecture

```
┌─────────────────┐
│   Web Browser   │
└────────┬────────┘
         │
         │ HTTPS
         │
┌────────▼────────┐
│  Angular App    │
│  (Frontend)     │
│  Port: 4200     │
├─────────────────┤
│ - Components    │
│ - Services      │
│ - Models        │
│ - Guards        │
└────────┬────────┘
         │
         │ REST API
         │ HTTP/JSON
         │
┌────────▼────────┐
│  Express API    │
│  (Backend)      │
│  Port: 3000     │
├─────────────────┤
│ - Routes        │
│ - Controllers   │
│ - Middleware    │
│ - Models        │
└────────┬────────┘
         │
         │ Firebase SDK
         │
┌────────▼────────┐
│    Firebase     │
├─────────────────┤
│ - Auth          │
│ - Firestore     │
└─────────────────┘
```

## Frontend Architecture

### Component Structure

```
src/app/
├── components/
│   ├── kanban-board/      # Main task board view
│   ├── task-card/         # Individual task display
│   ├── navbar/            # Navigation component
│   └── auth/              # Authentication components
│       ├── login/
│       └── register/
├── services/
│   ├── firebase.service.ts   # Firebase SDK wrapper
│   ├── auth.service.ts       # Authentication logic
│   └── task.service.ts       # Task CRUD operations
├── models/
│   ├── task.model.ts         # Task interfaces
│   └── user.model.ts         # User interfaces
└── app.module.ts             # Main application module
```

### Key Frontend Patterns

1. **Service Layer Pattern**
   - Services handle all business logic
   - Components focus on presentation
   - Services use RxJS for reactive state management

2. **Observable Data Streams**
   - User state managed via `BehaviorSubject`
   - Tasks state managed via `BehaviorSubject`
   - Components subscribe to changes

3. **Standalone Components**
   - Modern Angular approach
   - Each component is self-contained
   - Explicit imports for dependencies

### Data Flow (Frontend)

```
User Action → Component → Service → Firebase/API → Update Observable → Component Re-renders
```

## Backend Architecture

### Project Structure

```
src/
├── routes/
│   ├── tasks.ts           # Task endpoints
│   ├── users.ts           # User endpoints
│   └── auth.ts            # Auth endpoints
├── controllers/
│   ├── taskController.ts  # Task business logic
│   └── authController.ts  # Auth business logic
├── middleware/
│   └── auth.ts            # JWT verification
├── models/
│   ├── Task.ts            # Task model & helpers
│   └── User.ts            # User model & helpers
├── config/
│   └── firebase.ts        # Firebase initialization
└── server.ts              # Express app setup
```

### Key Backend Patterns

1. **MVC Pattern**
   - Routes define endpoints
   - Controllers handle business logic
   - Models represent data structures

2. **Middleware Chain**
   - Authentication verification
   - Role-based access control
   - Error handling

3. **Dependency Injection**
   - Firebase services injected into controllers
   - Middleware applied at route level

### Request Flow (Backend)

```
HTTP Request → Express Router → Auth Middleware → Controller → Firebase → Response
```

## Data Models

### Task Model

```typescript
{
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignedTo?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  tags?: string[]
  estimatedHours?: number
  actualHours?: number
}
```

### User Model

```typescript
{
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role: 'admin' | 'manager' | 'staff'
  createdAt: Date
  lastLogin?: Date
}
```

## Authentication Flow

### User Registration
1. User submits registration form
2. Frontend creates Firebase user via `createUserWithEmailAndPassword`
3. User profile created in Firestore
4. User automatically logged in
5. ID token stored for API calls

### User Login
1. User submits credentials
2. Frontend authenticates via `signInWithEmailAndPassword`
3. Firebase returns ID token
4. Token stored and used for subsequent API calls
5. User profile loaded from Firestore

### API Authentication
1. Frontend includes token in Authorization header
2. Backend middleware verifies token with Firebase Admin
3. User info attached to request object
4. Controller accesses authenticated user data

## Security Considerations

### Frontend Security
- Firebase security rules restrict data access
- Authentication required for all routes (via guards)
- Tokens automatically refreshed by Firebase SDK
- Sensitive operations confirmed with user

### Backend Security
- All API routes protected by authentication middleware
- Role-based access control for sensitive operations
- Helmet.js for HTTP header security
- CORS configured for specific origins
- Input validation (should be extended)

### Firebase Security
- Firestore rules restrict read/write access
- Users can only modify their own data (unless admin)
- Service account credentials secured in environment variables
- Private keys never exposed to frontend

## Scalability Considerations

### Current Limitations
- No pagination implemented
- All tasks loaded at once
- No caching strategy
- Synchronous database operations

### Recommended Improvements
1. **Implement Pagination**
   - Limit query results
   - Add cursor-based pagination
   - Load more as user scrolls

2. **Add Caching**
   - Cache frequently accessed data
   - Implement cache invalidation strategy
   - Use Redis for distributed caching

3. **Optimize Queries**
   - Create Firestore indexes
   - Use query filters effectively
   - Implement real-time listeners selectively

4. **Load Balancing**
   - Deploy multiple backend instances
   - Use load balancer (e.g., Nginx)
   - Implement health checks

## Deployment Architecture

### Development
```
Local Machine:
  - Frontend: http://localhost:4200
  - Backend: http://localhost:3000
  - Firebase: Cloud-hosted
```

### Production (Recommended)
```
Cloud Infrastructure:
  - Frontend: Static hosting (Firebase Hosting, Vercel, Netlify)
  - Backend: Container service (Cloud Run, ECS, Kubernetes)
  - Firebase: Production project with security rules
  - CDN: For static assets
  - SSL/TLS: Required for all connections
```

## Testing Strategy (Future Implementation)

### Frontend Testing
- **Unit Tests**: Jest for services and components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Cypress or Playwright for user flows

### Backend Testing
- **Unit Tests**: Jest for controllers and models
- **Integration Tests**: Test API endpoints
- **Load Tests**: Artillery or k6 for performance

## Monitoring and Logging (Recommended)

### Application Monitoring
- Error tracking (Sentry, Rollbar)
- Performance monitoring (New Relic, DataDog)
- User analytics (Google Analytics, Mixpanel)

### Infrastructure Monitoring
- Server health checks
- Database performance metrics
- API response times
- Error rates and logs

## Future Enhancements

1. **Real-time Updates**
   - Implement WebSocket connections
   - Live task updates across users
   - Notifications for task changes

2. **Advanced Features**
   - Task comments and attachments
   - Time tracking
   - Reporting and analytics
   - Team collaboration features

3. **Mobile Support**
   - Responsive design improvements
   - Progressive Web App (PWA)
   - Native mobile apps (React Native, Flutter)

4. **Integrations**
   - Calendar sync (Google Calendar, Outlook)
   - Slack/Teams notifications
   - Third-party task management tools

## Contributing

When contributing to this project:
1. Follow the established architecture patterns
2. Maintain separation of concerns
3. Write clean, documented code
4. Add tests for new features
5. Update documentation as needed

## References

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/best-practices)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
