import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated(): boolean {
    try {
      return localStorage.getItem('auth') === '1';
    } catch {
      return false;
    }
  }

  getUsername(): string | null {
    try {
      return localStorage.getItem('username');
    } catch {
      return null;
    }
  }

  logout(): void {
    try {
      localStorage.removeItem('auth');
      localStorage.removeItem('username');
    } catch {}
  }
}
