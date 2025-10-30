import { Request, Response, NextFunction } from 'express';
import { getAuth } from '../config/firebase';

/**
 * Extended Express Request interface with authenticated user information
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email: string;
    role?: string;
  };
}

/**
 * Middleware to verify Firebase authentication token
 * Extracts the Bearer token from Authorization header and verifies it
 */
export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({ error: 'No authorization header provided' });
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Invalid authorization format. Expected: Bearer <token>' });
      return;
    }

    const token = authHeader.substring(7);
    
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    // Verify the Firebase token
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    
    // Attach user information to the request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      role: decodedToken.role
    };

    next();
  } catch (error: any) {
    console.error('Token verification error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      res.status(401).json({ error: 'Token has expired' });
      return;
    }
    
    if (error.code === 'auth/id-token-revoked') {
      res.status(401).json({ error: 'Token has been revoked' });
      return;
    }
    
    res.status(401).json({ error: 'Invalid authentication token' });
  }
}

/**
 * Middleware to check if the authenticated user has one of the required roles
 */
export function requireRole(...roles: string[]) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      const userRole = req.user.role || 'staff';
      
      if (!roles.includes(userRole)) {
        res.status(403).json({ 
          error: 'Insufficient permissions',
          required: roles,
          current: userRole
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Role verification error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

/**
 * Optional authentication middleware
 * Attempts to authenticate but allows the request to proceed even if authentication fails
 */
export async function optionalAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const auth = getAuth();
      const decodedToken = await auth.verifyIdToken(token);
      
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email || '',
        role: decodedToken.role
      };
    }
  } catch (error) {
    // Silently fail - user remains unauthenticated
    console.log('Optional auth failed, proceeding without authentication');
  }
  
  next();
}
