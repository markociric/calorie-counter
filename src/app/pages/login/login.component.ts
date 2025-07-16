import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: false,
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      alert('Please enter both username and password.');
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
