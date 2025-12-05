import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  signout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  }

  parseToken = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64));

    return JSON.parse(jsonPayload);
  };

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    return true;
  }


  public isAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    const claims = this.parseToken(token);
    return claims.role == 'ADMIN';

  }

  public setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public setUsername(username: string): void {
    sessionStorage.setItem('username', username);
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public getUsername() {
    return sessionStorage.getItem('username');
  }
}
