import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // If user is authenticated, allow access
    if (this.auth.isAuthenticated()) {
      return true;
    }
    
    // If not authenticated, redirect to login using Angular router
    // This prevents full page reload and infinite redirects
    return this.router.parseUrl('/login');
  }
}
