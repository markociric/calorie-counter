import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  username: string;
  role: string; 
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  /** Dohvata sve korisnike iz backend-a */
 getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.API_URL}/auth/readUsers`);
}
}