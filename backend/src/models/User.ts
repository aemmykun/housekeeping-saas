export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'manager' | 'staff';
  createdAt: Date;
  lastLogin?: Date;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'manager' | 'staff';
}

export interface CreateUserDto {
  email: string;
  displayName: string;
  role?: 'admin' | 'manager' | 'staff';
}

export interface UpdateUserDto {
  displayName?: string;
  photoURL?: string;
  role?: 'admin' | 'manager' | 'staff';
}

export class UserModel {
  static fromFirestore(uid: string, data: any): User {
    return {
      uid,
      email: data.email,
      displayName: data.displayName,
      photoURL: data.photoURL,
      role: data.role || 'staff',
      createdAt: data.createdAt?.toDate() || new Date(),
      lastLogin: data.lastLogin?.toDate()
    };
  }

  static toFirestore(user: Partial<User>): any {
    const data: any = {};
    
    if (user.email !== undefined) data.email = user.email;
    if (user.displayName !== undefined) data.displayName = user.displayName;
    if (user.photoURL !== undefined) data.photoURL = user.photoURL;
    if (user.role !== undefined) data.role = user.role;
    if (user.createdAt !== undefined) data.createdAt = user.createdAt;
    if (user.lastLogin !== undefined) data.lastLogin = user.lastLogin;

    return data;
  }

  static toProfile(user: User): UserProfile {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role
    };
  }
}
