import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username.trim() === 'admin' || this.password.trim() === 'admin') {
      alert('Please enter both username and password.');
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
