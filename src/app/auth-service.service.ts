import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  token: string | null = null;
  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('accessToken', token);
    }
    localStorage.setItem('accessToken', token);
  }

  getToken(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.token = localStorage.getItem('accessToken');
      return this.token;
    }
    return null;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('accessToken');
      location.replace('/');
    }
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.token = localStorage.getItem('accessToken');
    }
    if (!this.token) return false;

    try {
      const decodedToken: any = jwtDecode(this.token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp ? decodedToken.exp > currentTime : false;
    } catch (error) {
      return false;
    }
  }

  getUser(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.sub;
      }
    }
    throw new Error('Access token not found or invalid');
  }
}
