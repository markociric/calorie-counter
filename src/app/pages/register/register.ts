import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: false,
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  username = '';
  password = '';
  loading = false;
  errorMsg: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.errorMsg = null;

    if (!this.username.trim() || !this.password) {
      this.errorMsg = 'Username and password are required';
      return;
    }

    this.loading = true;

    this.authService
      .register({ username: this.username.trim(), password: this.password })
      .subscribe({
        next: () => {
          // Uspeh – backend je vratio 200 OK (tekst)
          this.onSuccess();
        },
        error: (err) => {
          // U oba slučaja prvo prestani sa loading spinner-om
          this.loading = false;

          // Ako je status 200, tretiraj kao uspeh
          if (err.status === 200) {
            this.onSuccess();
          } else {
            // Prikaži poruku greške
            this.errorMsg = err.error?.message || 'Registration failed';
          }
        },
      });
  }

  private onSuccess(): void {
    this.loading = false;
    alert('Registration successful');
    this.router.navigate(['/login']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
