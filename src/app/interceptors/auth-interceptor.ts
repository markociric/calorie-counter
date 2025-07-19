// src/app/interceptors/auth-interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1) Ako je login ili register, ne dodajemo token
    if (req.url.endsWith('/auth/login') || req.url.endsWith('/auth/register')) {
      return next.handle(req);
    }

    // 2) Inače, dohvatimo token i, ako postoji, setujemo header
    const token = this.authService.getAccessToken();
    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(authReq);
    }

    // 3) Ako nema tokena, samo prosledi originalni request
    return next.handle(req);
  }
}
