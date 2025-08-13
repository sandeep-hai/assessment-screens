import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, UserRole, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  // Mock users data
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'student1@humera.ai',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.STUDENT,
      isActive: true,
      collegeId: 'college1',
      createdAt: new Date(),
      lastLoginAt: new Date()
    },
    {
      id: '2',
      email: 'lecturer1@humera.ai',
      firstName: 'Jane',
      lastName: 'Smith',
      role: UserRole.LECTURER,
      isActive: true,
      collegeId: 'college1',
      createdAt: new Date(),
      lastLoginAt: new Date()
    },
    {
      id: '3',
      email: 'collegeadmin@humera.ai',
      firstName: 'Robert',
      lastName: 'Johnson',
      role: UserRole.COLLEGE_ADMIN,
      isActive: true,
      collegeId: 'college1',
      createdAt: new Date(),
      lastLoginAt: new Date()
    },
    {
      id: '4',
      email: 'appadmin@humera.ai',
      firstName: 'Alice',
      lastName: 'Wilson',
      role: UserRole.APP_ADMIN,
      isActive: true,
      createdAt: new Date(),
      lastLoginAt: new Date()
    }
  ];

  private mockOTPs: { [email: string]: string } = {
    'student1@humera.ai': '111111',
    'lecturer1@humera.ai': '222222',
    'collegeadmin@humera.ai': '333333',
    'appadmin@humera.ai': '444444'
  };

  constructor() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    const savedToken = localStorage.getItem('authToken');
    
    if (savedUser && savedToken) {
      this.currentUserSubject.next(JSON.parse(savedUser));
      this.tokenSubject.next(savedToken);
    }
  }

  sendOTP(email: string): Observable<boolean> {
    return of(this.mockUsers.some(user => user.email === email)).pipe(
      delay(1000) // Simulate API delay
    );
  }

  verifyOTP(email: string, otp: string): Observable<AuthResponse> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const user = this.mockUsers.find(u => u.email === email);
        const expectedOTP = this.mockOTPs[email];
        
        if (user && otp === expectedOTP) {
          const token = this.generateMockToken();
          const authResponse: AuthResponse = {
            user,
            token,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
          };

          // Save to local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('authToken', token);

          // Update subjects
          this.currentUserSubject.next(user);
          this.tokenSubject.next(token);

          return authResponse;
        } else {
          throw new Error('Invalid OTP');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value && !!this.tokenSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  private generateMockToken(): string {
    return 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);
  }
}