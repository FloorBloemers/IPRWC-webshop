import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usernameSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('username'));

  signout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.usernameSubject = null;
  }

  parseToken = (token: string) => {
    console.log('JWT claims:', this.parseToken(token));

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
    this.usernameSubject.next(username);
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public getUsername() {
    return sessionStorage.getItem('username');
  }

  public getUsernameObservable(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }
}
