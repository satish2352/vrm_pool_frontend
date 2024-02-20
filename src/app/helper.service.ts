

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiUrl = "https://finalapi.soilchargertechnology.com/api"; // Update with your API URL
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  login(data:object)  {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}

