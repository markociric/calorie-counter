import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const role = localStorage.getItem('userRole') || '';
    if (role === 'ROLE_ADMIN') {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}