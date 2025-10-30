import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  Auth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  Firestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  DocumentData
} from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp;
  private auth: Auth;
  private firestore: Firestore;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
  }

  // Auth methods
  getAuth(): Auth {
    return this.auth;
  }

  getCurrentUser(): FirebaseUser | null {
    return this.auth.currentUser;
  }

  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(this.auth, callback);
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signOut() {
    return signOut(this.auth);
  }

  // Firestore methods
  getFirestore(): Firestore {
    return this.firestore;
  }

  getCollection(collectionName: string) {
    return collection(this.firestore, collectionName);
  }

  getDocument(collectionName: string, docId: string) {
    return doc(this.firestore, collectionName, docId);
  }

  async addDocument(collectionName: string, data: any) {
    const colRef = this.getCollection(collectionName);
    return addDoc(colRef, data);
  }

  async updateDocument(collectionName: string, docId: string, data: any) {
    const docRef = this.getDocument(collectionName, docId);
    return updateDoc(docRef, data);
  }

  async deleteDocument(collectionName: string, docId: string) {
    const docRef = this.getDocument(collectionName, docId);
    return deleteDoc(docRef);
  }

  async getDocuments(collectionName: string) {
    const colRef = this.getCollection(collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getDocumentById(collectionName: string, docId: string) {
    const docRef = this.getDocument(collectionName, docId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  }

  createQuery(collectionName: string, conditions: any[]) {
    const colRef = this.getCollection(collectionName);
    return query(colRef, ...conditions);
  }
}
