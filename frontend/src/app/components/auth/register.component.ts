import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterData } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData: RegisterData = {
    email: '',
    password: '',
    displayName: ''
  };
  confirmPassword = '';
  error = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      await this.authService.register(this.registerData);
    } catch (error: any) {
      this.error = this.getErrorMessage(error);
      this.isLoading = false;
    }
  }

  private validateForm(): boolean {
    if (!this.registerData.email || !this.registerData.password || !this.registerData.displayName) {
      this.error = 'Please fill in all fields';
      return false;
    }

    if (this.registerData.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return false;
    }

    if (this.registerData.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return false;
    }

    return true;
  }

  private getErrorMessage(error: any): string {
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'This email is already registered';
        case 'auth/invalid-email':
          return 'Invalid email address';
        case 'auth/weak-password':
          return 'Password is too weak';
        default:
          return 'Registration failed. Please try again';
      }
    }
    return error.message || 'An unexpected error occurred';
  }
}
