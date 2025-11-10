# Housekeeping SaaS

A modern housekeeping SaaS tool with Kanban UI, built with Angular, Node/Express backend, and Firebase.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Angular](https://img.shields.io/badge/Angular-17-red.svg)
![Node](https://img.shields.io/badge/Node-18+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)

## 🚀 Features

- **Kanban Board Interface** - Intuitive drag-and-drop task management
- **Real-time Updates** - Firebase integration for instant synchronization
- **User Authentication** - Secure Firebase authentication with role-based access
- **Task Management** - Create, update, delete, and organize tasks
- **Priority & Status Tracking** - Manage task priorities and workflow stages
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **RESTful API** - Clean and documented API endpoints
- **TypeScript** - Type-safe development across the stack

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Documentation](#-documentation)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Technology Stack

### Frontend
- **Angular 17** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **SCSS** - Advanced styling
- **Firebase SDK** - Authentication and Firestore

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Firebase Admin SDK** - Server-side Firebase integration
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Database & Authentication
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Authentication** - User authentication service

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
housekeeping-saas/
├── frontend/                    # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # UI components
│   │   │   │   ├── kanban-board/
│   │   │   │   ├── task-card/
│   │   │   │   ├── navbar/
│   │   │   │   └── auth/
│   │   │   ├── services/       # Business logic services
│   │   │   ├── models/         # TypeScript interfaces
│   │   │   └── app.module.ts
│   │   ├── assets/
│   │   ├── environments/       # Environment configs
│   │   └── styles/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── backend/                     # Express API server
│   ├── src/
│   │   ├── routes/             # API routes
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # Auth & validation
│   │   ├── config/             # Configuration
│   │   ├── models/             # Data models
│   │   └── server.ts           # Entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── docs/                        # Documentation
│   ├── API.md                  # API documentation
│   ├── SETUP.md                # Setup guide
│   └── ARCHITECTURE.md         # Architecture details
├── README.md
├── .gitignore
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/housekeeping-saas.git
   cd housekeeping-saas
   ```

2. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Download service account credentials

3. **Set up Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your Firebase credentials
   npm run dev
   ```

4. **Set up Frontend**
   ```bash
   cd frontend
   npm install
   # Edit src/environments/environment.ts with your Firebase config
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:4200
   - Backend: http://localhost:3000
   - Health check: http://localhost:3000/health

### Docker Setup

```bash
docker-compose up --build
```

For detailed setup instructions, see [SETUP.md](./docs/SETUP.md).

## 📚 Documentation

- **[Setup Guide](./docs/SETUP.md)** - Detailed installation and configuration
- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and patterns

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/verify` - Verify token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - Create user profile

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/user/:userId` - Get user's tasks

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

For complete API documentation, see [API.md](./docs/API.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Firebase for authentication and database services
- Express.js community for the robust backend framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Angular, Express, and Firebase**
# Housekeeping SaaS Tool

A modern housekeeping SaaS application featuring a Kanban board for task management, built with Angular frontend, Node.js/Express backend, and Firebase for data storage and authentication.

## Features

- 🎯 **Kanban Board**: Drag-and-drop task management with multiple status columns
- 🔐 **User Authentication**: Secure Firebase authentication (Email/Password, Google)
- ⚡ **Real-time Updates**: Live synchronization across all connected clients using Firestore
- 📱 **Responsive Design**: Mobile-friendly interface that works on all devices
- 🏷️ **Task Management**: Create, edit, delete, and organize housekeeping tasks
- 👥 **Multi-user Support**: Assign tasks to team members
- 🔔 **Notifications**: Real-time task updates and assignments

## Tech Stack

### Frontend
- **Angular 16+**: Modern TypeScript framework
- **Angular Material**: UI component library
- **@angular/cdk/drag-drop**: Native drag-and-drop functionality for Kanban board
- **RxJS**: Reactive programming for real-time updates
- **Firebase SDK**: Client-side authentication and Firestore integration

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **Firebase Admin SDK**: Server-side Firebase operations
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Database & Auth
- **Firebase Firestore**: NoSQL cloud database for task storage
- **Firebase Authentication**: User authentication and management
- **Firebase Security Rules**: Data access control

## Project Structure

```
housekeeping-saas/
├── frontend/                    # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── kanban-board/      # Kanban board component
│   │   │   │   ├── task-card/         # Individual task card
│   │   │   │   ├── login/             # Login/register page
│   │   │   │   ├── dashboard/         # Main dashboard
│   │   │   │   └── header/            # App header/navbar
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts    # Authentication service
│   │   │   │   ├── task.service.ts    # Task CRUD operations
│   │   │   │   └── firebase.service.ts # Firebase initialization
│   │   │   ├── models/
│   │   │   │   ├── task.model.ts      # Task interface/model
│   │   │   │   └── user.model.ts      # User interface/model
│   │   │   └── guards/
│   │   │       └── auth.guard.ts      # Route protection
│   │   ├── assets/                     # Static assets
│   │   └── environments/               # Environment configs
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── task.controller.js     # Task operations
│   │   │   └── auth.controller.js     # Auth operations
│   │   ├── models/
│   │   │   └── task.model.js          # Task schema/validation
│   │   ├── routes/
│   │   │   ├── task.routes.js         # Task API routes
│   │   │   └── auth.routes.js         # Auth API routes
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js     # JWT/Firebase auth
│   │   │   └── error.middleware.js    # Error handling
│   │   ├── config/
│   │   │   └── firebase.config.js     # Firebase initialization
│   │   ├── services/
│   │   │   └── firebase.service.js    # Firebase operations
│   │   └── server.js                  # Express app entry point
│   ├── package.json
│   └── .env.example
│
└── README.md                    # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.x or higher) and npm
- **Angular CLI** (`npm install -g @angular/cli`)
- **Firebase Account** (https://firebase.google.com/)

## Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Enable Google Analytics (optional)

2. **Enable Firestore Database**:
   - In Firebase Console, go to "Firestore Database"
   - Click "Create database"
   - Start in test mode (we'll add security rules later)
   - Choose a location closest to your users

3. **Enable Authentication**:
   - Go to "Authentication" in Firebase Console
   - Click "Get started"
   - Enable "Email/Password" and "Google" sign-in methods

4. **Get Firebase Configuration**:
   - Go to Project Settings (gear icon)
   - Under "Your apps", click the web icon (</>)
   - Register your app and copy the Firebase config object
   - You'll need this for both frontend and backend

5. **Generate Service Account Key** (for backend):
   - In Project Settings, go to "Service accounts"
   - Click "Generate new private key"
   - Save the JSON file securely (don't commit to git!)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/aemmykun/housekeeping-saas.git
cd housekeeping-saas
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env

# Edit .env with your Firebase credentials
nano .env
```

Add the following to your `.env` file:
```env
PORT=3000
NODE_ENV=development

# Firebase Admin SDK - Path to service account JSON
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json

# Firebase Config (from Firebase Console)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# CORS
CORS_ORIGIN=http://localhost:4200
```

Place your Firebase service account JSON file in the backend directory:
```bash
# Copy your service account key
cp /path/to/your-firebase-service-account.json ./firebase-service-account.json
```

Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Update environment configuration
nano src/environments/environment.ts
```

Add your Firebase config to `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  }
};
```

Start the Angular development server:
```bash
ng serve
# or
npm start
```

The frontend will run on `http://localhost:4200`

## Usage

1. **Open the Application**: Navigate to `http://localhost:4200` in your browser

2. **Register/Login**: 
   - Create a new account with email/password
   - Or sign in with Google

3. **Create Tasks**:
   - Click "Add Task" button
   - Fill in task details (title, description, assignee)
   - Tasks start in "To Do" column

4. **Manage Tasks**:
   - Drag and drop tasks between columns (To Do, In Progress, Done)
   - Click on a task to edit details
   - Delete tasks using the delete button

5. **Real-time Collaboration**:
   - Open the app in multiple browsers/tabs
   - Changes sync automatically across all instances

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/status` - Update task status (for Kanban columns)

## Firestore Data Structure

### Users Collection
```javascript
users/{userId}
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  createdAt: timestamp
}
```

### Tasks Collection
```javascript
tasks/{taskId}
{
  id: string,
  title: string,
  description: string,
  status: 'todo' | 'in-progress' | 'done',
  assignedTo: string,  // userId
  createdBy: string,   // userId
  createdAt: timestamp,
  updatedAt: timestamp,
  priority: 'low' | 'medium' | 'high',
  dueDate: timestamp (optional)
}
```

## Security Rules

Add these Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Tasks are accessible to authenticated users
    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.createdBy == request.auth.uid;
      allow update: if request.auth != null && (resource.data.createdBy == request.auth.uid || resource.data.assignedTo == request.auth.uid);
      allow delete: if request.auth != null && resource.data.createdBy == request.auth.uid;
    }
  }
}
```

## Development Scripts

### Frontend
```bash
npm start           # Start dev server
npm run build       # Build for production
npm run test        # Run unit tests
npm run lint        # Lint code
```

### Backend
```bash
npm start           # Start server
npm run dev         # Start with nodemon (auto-reload)
npm run test        # Run tests
npm run lint        # Lint code
```

## Deployment

### Frontend (Firebase Hosting)
```bash
cd frontend
ng build --configuration production
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Backend (Various Options)

**Option 1: Google Cloud Run**
```bash
cd backend
gcloud run deploy housekeeping-api --source .
```

**Option 2: Heroku**
```bash
cd backend
heroku create your-app-name
git push heroku main
```

**Option 3: DigitalOcean App Platform**
- Connect your GitHub repository
- Configure build and run commands
- Add environment variables

## Troubleshooting

### Firebase Connection Issues
- Verify Firebase config in environment files
- Check Firebase service account key path
- Ensure Firestore and Authentication are enabled in Firebase Console

### CORS Errors
- Update `CORS_ORIGIN` in backend `.env`
- Verify frontend is running on the correct port

### Build Errors
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version: `node --version` (should be 16+)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Roadmap

- [ ] Mobile app (React Native/Flutter)
- [ ] Task comments and attachments
- [ ] Email notifications
- [ ] Task templates
- [ ] Team management and permissions
- [ ] Analytics dashboard
- [ ] Calendar view
- [ ] Recurring tasks
- [ ] Task time tracking
