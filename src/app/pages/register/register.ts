import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: false,
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  register() {
    if (!this.username.trim() || !this.email.trim() || !this.password.trim()) {
      alert('Please fill all fields.');
    } else {
      alert(`Registered ${this.username}!`);
      this.router.navigate(['/login']);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
