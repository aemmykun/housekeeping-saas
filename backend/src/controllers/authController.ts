import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { getAuth, getFirestore } from '../config/firebase';
import { User, UserModel, CreateUserDto, UpdateUserDto } from '../models/User';

/**
 * Auth Controller
 * Handles authentication and user management operations
 */

/**
 * Get current user profile
 * GET /api/auth/me
 */
export async function getCurrentUser(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user?.uid;
    
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    
    const db = getFirestore();
    const userRef = db.collection('users').doc(userId);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      res.status(404).json({ error: 'User profile not found' });
      return;
    }
    
    const user = UserModel.fromFirestore(doc.id, doc.data());
    const profile = UserModel.toProfile(user);
    
    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
}

/**
 * Create a new user profile
 * POST /api/auth/users
 */
export async function createUserProfile(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const userData: CreateUserDto = req.body;
    const userId = req.user?.uid;
    
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    
    const db = getFirestore();
    const userRef = db.collection('users').doc(userId);
    
    // Check if user profile already exists
    const existingUser = await userRef.get();
    if (existingUser.exists) {
      res.status(409).json({ error: 'User profile already exists' });
      return;
    }
    
    const newUser: Omit<User, 'uid'> = {
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role || 'staff',
      createdAt: new Date()
    };
    
    await userRef.set(UserModel.toFirestore(newUser));
    
    const user: User = {
      uid: userId,
      ...newUser
    };
    
    res.status(201).json({ success: true, data: UserModel.toProfile(user) });
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Failed to create user profile' });
  }
}

/**
 * Update user profile
 * PUT /api/auth/users/:id
 */
export async function updateUserProfile(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const updates: UpdateUserDto = req.body;
    const currentUserId = req.user?.uid;
    
    if (!currentUserId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    
    // Users can only update their own profile unless they're an admin
    if (currentUserId !== id && req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }
    
    const db = getFirestore();
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      res.status(404).json({ error: 'User profile not found' });
      return;
    }
    
    await userRef.update(UserModel.toFirestore(updates));
    
    const updatedDoc = await userRef.get();
    const updatedUser = UserModel.fromFirestore(updatedDoc.id, updatedDoc.data());
    
    res.json({ success: true, data: UserModel.toProfile(updatedUser) });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
}

/**
 * Get all users (admin only)
 * GET /api/auth/users
 */
export async function getAllUsers(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const db = getFirestore();
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    
    const users: User[] = [];
    snapshot.forEach(doc => {
      users.push(UserModel.fromFirestore(doc.id, doc.data()));
    });
    
    const profiles = users.map(user => UserModel.toProfile(user));
    
    res.json({ success: true, data: profiles });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
}

/**
 * Get user by ID
 * GET /api/auth/users/:id
 */
export async function getUserById(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const db = getFirestore();
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    const user = UserModel.fromFirestore(doc.id, doc.data());
    res.json({ success: true, data: UserModel.toProfile(user) });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

/**
 * Verify Firebase token
 * POST /api/auth/verify
 */
export async function verifyToken(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    // If we reach here, the token has been verified by the authenticateToken middleware
    res.json({ 
      success: true, 
      message: 'Token is valid',
      user: req.user
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ error: 'Failed to verify token' });
  }
}
