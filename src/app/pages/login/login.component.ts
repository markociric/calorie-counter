// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: false,
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  passwordVisible = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      alert('Molim unesite korisničko ime i lozinku.');
      return;
    }

    this.authService
      .login({ username: this.username, password: this.password })
      .pipe(
        catchError(err => {
          alert('Login neuspešan');
          return of(null);
        })
      )
      .subscribe(res => {
        if (!res) return;

        // Sačuvaj tokene
        this.authService.saveTokens(res.accessToken, res.refreshToken);

        // Dohvati ulogu iz access tokena
        const role = this.authService.getUserRole();
        console.log('User role from token:', role);

        // Preusmeri na osnovu uloge
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
