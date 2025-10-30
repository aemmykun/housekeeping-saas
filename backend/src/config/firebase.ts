import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

/**
 * Initialize Firebase Admin SDK
 * This module handles Firebase Admin initialization with credentials
 */

let firebaseApp: admin.app.App;

export function initializeFirebase(): admin.app.App {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    // Option 1: Load from service account file
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    
    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
      // Validate path to prevent path traversal attacks
      const resolvedPath = path.resolve(serviceAccountPath);
      if (!resolvedPath.startsWith(process.cwd())) {
        throw new Error('Service account path must be within project directory');
      }
      
      const serviceAccountData = fs.readFileSync(resolvedPath, 'utf8');
      const serviceAccount = JSON.parse(serviceAccountData);
      
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      
      console.log('✅ Firebase initialized with service account file');
      return firebaseApp;
    }

    // Option 2: Load from environment variables
    if (process.env.FIREBASE_PROJECT_ID && 
        process.env.FIREBASE_CLIENT_EMAIL && 
        process.env.FIREBASE_PRIVATE_KEY) {
      
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
      });
      
      console.log('✅ Firebase initialized with environment variables');
      return firebaseApp;
    }

    // Option 3: Use default credentials (for deployed environments)
    firebaseApp = admin.initializeApp();
    console.log('✅ Firebase initialized with default credentials');
    return firebaseApp;

  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error);
    throw new Error('Firebase initialization failed');
  }
}

export function getFirestore(): admin.firestore.Firestore {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return admin.firestore();
}

export function getAuth(): admin.auth.Auth {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return admin.auth();
}

export default {
  initializeFirebase,
  getFirestore,
  getAuth
};
