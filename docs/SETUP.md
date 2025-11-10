# Setup Guide

This guide will help you set up the Housekeeping SaaS application for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Git**
- **Firebase Account** (for authentication and database)
- **Docker** (optional, for containerized deployment)

## Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication**
   - In Firebase Console, go to Authentication
   - Click "Get Started"
   - Enable "Email/Password" sign-in method

3. **Create Firestore Database**
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location

4. **Get Firebase Configuration**
   
   **For Frontend:**
   - Go to Project Settings
   - Scroll to "Your apps" section
   - Click the web icon (</>)
   - Copy the Firebase config object

   **For Backend:**
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file securely

## Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file**
   
   **Option 1: Using service account file**
   ```env
   PORT=3000
   NODE_ENV=development
   FIREBASE_SERVICE_ACCOUNT_PATH=./path/to/serviceAccountKey.json
   CORS_ORIGIN=http://localhost:4200
   ```

   **Option 2: Using environment variables**
   ```env
   PORT=3000
   NODE_ENV=development
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   CORS_ORIGIN=http://localhost:4200
   ```

5. **Place Firebase service account file** (if using Option 1)
   - Save the downloaded JSON file as `serviceAccountKey.json` in the backend directory
   - **Important**: Add this file to `.gitignore` to prevent committing sensitive data

6. **Build the backend**
   ```bash
   npm run build
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

   The backend should now be running at `http://localhost:3000`

## Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Edit `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: 'YOUR_API_KEY',
       authDomain: 'your-project.firebaseapp.com',
       projectId: 'your-project-id',
       storageBucket: 'your-project.appspot.com',
       messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
       appId: 'YOUR_APP_ID'
     },
     apiUrl: 'http://localhost:3000/api'
   };
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The frontend should now be running at `http://localhost:4200`

## Docker Setup (Optional)

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

   This will start both frontend and backend services:
   - Frontend: `http://localhost:4200`
   - Backend: `http://localhost:3000`

2. **Stop the services**
   ```bash
   docker-compose down
   ```

## Verify Installation

1. **Check backend health**
   ```bash
   curl http://localhost:3000/health
   ```

   You should receive a JSON response with status "ok".

2. **Open the frontend**
   - Navigate to `http://localhost:4200` in your browser
   - You should see the login page

3. **Create a test user**
   - Click "Sign Up"
   - Fill in the registration form
   - Submit to create your first user

## Firestore Security Rules

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                     (request.auth.uid == userId || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Tasks collection
    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
                      (resource.data.createdBy == request.auth.uid || 
                       resource.data.assignedTo == request.auth.uid ||
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'manager']);
      allow delete: if request.auth != null && 
                      (resource.data.createdBy == request.auth.uid ||
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

## Troubleshooting

### Backend won't start
- Verify Firebase credentials are correct
- Check if port 3000 is already in use
- Review logs for specific error messages

### Frontend won't connect to backend
- Verify backend is running
- Check CORS settings in backend `.env`
- Ensure `apiUrl` in frontend environment matches backend URL

### Authentication fails
- Verify Firebase authentication is enabled
- Check Firebase configuration in frontend
- Ensure service account has proper permissions

### Database operations fail
- Verify Firestore is created and accessible
- Check Firebase security rules
- Ensure service account has Firestore permissions

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system design
- Review [API.md](./API.md) for API documentation
- Start customizing the application for your needs

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
