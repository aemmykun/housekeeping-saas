# Quick Start Guide

This guide will help you get cloudKklean application up and running quickly.

## Prerequisites Checklist

- [ ] Node.js (v16+) installed
- [ ] npm installed
- [ ] Angular CLI installed globally
- [ ] Firebase account created
- [ ] Firebase project created

## Step-by-Step Setup

### 1. Firebase Setup (15 minutes)

#### Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name: "cloudKklean" (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

#### Enable Firestore
1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Start in **test mode** for development
4. Choose a location closest to you
5. Click "Enable"

#### Enable Authentication
1. Click "Authentication" in the sidebar
2. Click "Get started"
3. Enable "Email/Password" provider
4. Enable "Google" provider
5. Add authorized domain: `localhost`

#### Get Web Configuration
1. Click the gear icon ⚙️ > "Project settings"
2. Scroll to "Your apps"
3. Click the Web icon `</>`
4. Register app name: "housekeeping-frontend"
5. Copy the Firebase config object
6. Save it for the next step

#### Get Service Account Key
1. In Project Settings, go to "Service accounts"
2. Click "Generate new private key"
3. Save the JSON file securely
4. Keep this file private!

### 2. Clone and Install (5 minutes)

```bash
# Clone repository
git clone https://github.com/aemmykun/cloudklean.git
cd cloudklean

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Backend (3 minutes)

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env file
nano .env  # or use your preferred editor
```

Update these values in `.env`:
```env
PORT=3000
NODE_ENV=development
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
CORS_ORIGIN=http://localhost:4200
```

Copy your service account key:
```bash
# Copy your downloaded firebase service account JSON here
cp ~/Downloads/your-project-firebase-adminsdk.json ./firebase-service-account.json
```

### 4. Configure Frontend (3 minutes)

```bash
cd ../frontend
nano src/environments/environment.ts
```

Paste your Firebase config:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  firebase: {
    apiKey: "AIza...",  // Paste your config here
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:..."
  }
};
```

### 5. Start the Application (2 minutes)

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Should see: "Housekeeping SaaS API Server running on port 3000"
```

**Terminal 2 - Frontend:**
```bash
cd frontend
ng serve
# Should see: "Compiled successfully"
```

### 6. Test the Application (5 minutes)

1. Open browser to http://localhost:4200
2. You should see the login page
3. Click "Register" tab
4. Create a test account:
   - Email: test@example.com
   - Password: test123
5. Click "Register"
6. You should be redirected to the dashboard with an empty Kanban board

### 7. Create Your First Task

1. Click "Add Task" button
2. Fill in:
   - Title: "Test task"
   - Description: "My first task"
3. The task should appear in the "To Do" column
4. Try dragging it to "In Progress" or "Done"

## Troubleshooting

### Backend won't start
- Check that Firebase service account file exists
- Verify `.env` file is configured correctly
- Check Node.js version: `node --version` (should be 16+)

### Frontend won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Angular CLI: `ng version`
- Clear Angular cache: `rm -rf .angular`

### Can't login/register
- Check browser console for errors
- Verify Firebase config in environment.ts
- Check that Authentication is enabled in Firebase Console
- Ensure backend is running

### CORS errors
- Check CORS_ORIGIN in backend .env matches frontend URL
- Restart backend after changing .env

### Firestore permission errors
1. Go to Firebase Console > Firestore Database > Rules
2. Use these temporary test rules (⚠️ for development only):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
3. Click "Publish"

## Next Steps

✅ Application is running!

Now you can:
- Create multiple tasks
- Drag them between columns
- Test real-time updates (open in multiple browser tabs)
- Try Google Sign-In
- Customize the UI
- Add more features

## Production Deployment

When ready for production:
1. Update Firestore security rules (see `firestore.rules` file)
2. Update environment.prod.ts with production URLs
3. Build frontend: `ng build --configuration production`
4. Deploy backend to your hosting provider
5. Deploy frontend to Firebase Hosting or similar

## Need Help?

- Check the main README.md for detailed documentation
- Review frontend/README.md for Angular-specific info
- Review backend/README.md for API documentation
- Check GitHub issues for common problems

## Security Checklist Before Production

- [ ] Update Firestore security rules
- [ ] Change JWT_SECRET in backend .env
- [ ] Use environment variables instead of service account file
- [ ] Enable HTTPS
- [ ] Add proper CORS origins
- [ ] Enable Firebase App Check
- [ ] Set up proper backup strategy
- [ ] Add monitoring and logging
