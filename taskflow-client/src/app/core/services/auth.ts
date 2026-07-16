import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  register(fullName: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { fullName, email, password }, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? null;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload['exp'];
      const now = Math.floor(Date.now() / 1000);
      return expiry > now;
    
  }
}