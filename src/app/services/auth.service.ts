import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClaimTypes } from '../shared/consts';

interface RegisterDto {
  workerCode: string;
  username: string;
  password: string;
  role: string;
}

interface LoginDto {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7080/api/Auth';
  private tokenKey = 'jwt_token';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  private userRoleSubject = new BehaviorSubject<string | null>(this.getUserRole());
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) { }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  register(data: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginDto): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
          this.loggedIn.next(true);

          const role = this.getUserRole();
          this.userRoleSubject.next(role);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.userRoleSubject.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isLoggedInValue(): boolean {
    return this.loggedIn.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload[ClaimTypes.role] || null;
    } catch {
      return null;
    }
  }

 getWorkerCode(): number | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['WorkerCode'] || null;
  } catch {
    return null;
  }
}


}
