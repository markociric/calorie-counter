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
  
  username: string = '';
  password: string = '';
  passwordVisible = false;
  constructor(
    private router: Router,
    private authService: AuthService    // injektujemo AuthService
  ) {}

  login() {
    console.log('Username:', this.username);
console.log('Password:', this.password);

    if (!this.username.trim() || !this.password.trim()) {
      alert('Molim unesite korisničko ime i lozinku.');
      return;
    }

    // Pozivamo AuthService.login() → HttpClient.post() → prolazi kroz interceptor
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
  this.authService.saveTokens(res.accessToken, res.refreshToken);
  localStorage.setItem('userRole', res.role);
  if (res.role === 'ROLE_ADMIN') {
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