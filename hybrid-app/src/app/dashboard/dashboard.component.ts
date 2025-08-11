import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h2>Dashboard</h2>
        <div class="spacer"></div>
        <div class="user-box">
          <span class="user">{{ username || 'User' }}</span>
          <button class="btn btn-outline" (click)="logout()">Logout</button>
        </div>
      </div>
      
    </div>
  `,
  styles: [
    `
    .dashboard { max-width: 960px; margin: 24px auto; padding: 0 16px; }
    .dashboard-header { display: flex; align-items: center; margin-bottom: 16px; }
    .spacer { flex: 1; }
    .user-box { display: flex; align-items: center; gap: 12px; }
    .user { font-weight: 600; }
    .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
    .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
    .btn { cursor: pointer; border: none; border-radius: 6px; padding: 8px 12px; font-weight: 600; }
    .btn-outline { background: transparent; border: 1px solid #1976d2; color: #1976d2; }
    .btn-outline:hover { background: #1976d2; color: #fff; }
    h2 { margin: 0; }
    h3 { margin: 0 0 8px; }
    ul { margin: 0; padding-left: 18px; }
    `
  ]
})
export class DashboardComponent {
  username: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.username = this.auth.getUsername();
  }

  logout() {
    this.auth.logout();
    window.location.href = '/#/login';
  }
}
