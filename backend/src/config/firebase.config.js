const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
function initializeFirebase() {
  try {
    let serviceAccount;

    // Check if service account file path is provided
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
      const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
      serviceAccount = require(serviceAccountPath);
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      // Use environment variables
      serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      };
    } else {
      throw new Error('Firebase configuration not found. Please set either FIREBASE_SERVICE_ACCOUNT_PATH or individual Firebase environment variables.');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error.message);
    process.exit(1);
  }
}

module.exports = { admin, initializeFirebase };
