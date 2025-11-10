const { admin } = require('../config/firebase.config');

class FirebaseService {
  constructor() {
    this.db = admin.firestore();
    this.auth = admin.auth();
  }

  // Firestore operations
  async getCollection(collectionName) {
    try {
      const snapshot = await this.db.collection(collectionName).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error getting collection ${collectionName}: ${error.message}`);
    }
  }

  async getDocument(collectionName, docId) {
    try {
      const doc = await this.db.collection(collectionName).doc(docId).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Error getting document: ${error.message}`);
    }
  }

  async createDocument(collectionName, data) {
    try {
      const docRef = await this.db.collection(collectionName).add(data);
      return { id: docRef.id, ...data };
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  async updateDocument(collectionName, docId, data) {
    try {
      await this.db.collection(collectionName).doc(docId).update(data);
      return { id: docId, ...data };
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  async deleteDocument(collectionName, docId) {
    try {
      await this.db.collection(collectionName).doc(docId).delete();
      return { id: docId, deleted: true };
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }

  // Auth operations
  async verifyIdToken(idToken) {
    try {
      const decodedToken = await this.auth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new Error(`Error verifying token: ${error.message}`);
    }
  }

  async getUser(uid) {
    try {
      const user = await this.auth.getUser(uid);
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }
}

module.exports = new FirebaseService();
