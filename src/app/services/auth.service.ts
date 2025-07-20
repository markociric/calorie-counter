// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiryDate: string;
}

interface DecodedToken {
  sub: string;
  exp: number;
  iat: number;
  authorities?: string[];  // ili 'roles'
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, data);
  }

  register(data: RegisterRequest): Observable<string> {
    return this.http.post(`${this.API_URL}/register`, data, { responseType: 'text' });
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  }

  /**
   * Extracts user role(s) from the JWT access token
   */
  getUserRoles(): string[] {
    const token = this.getAccessToken();
    if (!token) return [];
    const decoded: any = jwtDecode<DecodedToken>(token);
    // adjust property name based on your JWT claim
    return decoded.authorities || decoded.roles || [];
  }

  /**
   * Returns single role or null
   */
  getUserRole(): string | null {
    const roles = this.getUserRoles();
    return roles.length ? roles[0] : null;
  }
}