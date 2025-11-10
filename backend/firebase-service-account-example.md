# Example Firebase Service Account Configuration

To use Firebase Admin SDK in the backend, you need a service account key.

## How to Get Your Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon (⚙️) next to "Project Overview"
4. Go to "Project settings"
5. Navigate to "Service accounts" tab
6. Click "Generate new private key"
7. Download the JSON file
8. Save it as `firebase-service-account.json` in the backend directory

## Important Security Notes

⚠️ **NEVER commit this file to version control!**
⚠️ **Keep this file secure and private!**
⚠️ **Add it to .gitignore!**

The file should look like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

## Alternative: Environment Variables

Instead of using a JSON file, you can set individual environment variables:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"
```

This is more secure for production deployments.
