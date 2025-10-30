import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { User, LoginCredentials, RegisterData, UserProfile } from '../models/user.model';
import { User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserProfile | null>;
  public currentUser$: Observable<UserProfile | null>;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    
    // Listen to auth state changes
    this.firebaseService.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.loadUserProfile(firebaseUser);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  get currentUserValue(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  private async loadUserProfile(firebaseUser: FirebaseUser) {
    try {
      const userDoc = await this.firebaseService.getDocumentById('users', firebaseUser.uid);
      if (userDoc) {
        const userProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: userDoc.displayName || firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || undefined,
          role: userDoc.role || 'staff'
        };
        this.currentUserSubject.next(userProfile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      const userCredential = await this.firebaseService.signIn(
        credentials.email,
        credentials.password
      );
      
      // Update last login
      await this.firebaseService.updateDocument('users', userCredential.user.uid, {
        lastLogin: new Date()
      });
      
      await this.loadUserProfile(userCredential.user);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(registerData: RegisterData): Promise<void> {
    try {
      const userCredential = await this.firebaseService.signUp(
        registerData.email,
        registerData.password
      );
      
      // Create user profile in Firestore
      const userData: User = {
        uid: userCredential.user.uid,
        email: registerData.email,
        displayName: registerData.displayName,
        role: 'staff',
        createdAt: new Date()
      };
      
      // Use setDoc to create the document with the user ID
      const db = this.firebaseService.getFirestore();
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, userData);
      await this.loadUserProfile(userCredential.user);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.firebaseService.signOut();
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    return user !== null && roles.includes(user.role);
  }

  async getIdToken(): Promise<string | null> {
    const user = this.firebaseService.getCurrentUser();
    if (user) {
      return user.getIdToken();
    }
    return null;
  }
}
