

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiUrl = "http://13.234.59.130:3000/api"; 
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  login(data: object) {
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

  // getHeaders(): HttpHeaders {
  //   const token = this.getToken();
  //   return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // }
  logout(): void {
    this.removeToken();
  }
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.apiUrl}/uploadBulkUsers`, formData, {
      // headers: this.getHeaders()
    });
  }

  uploadFileAgent(data: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/uploadAgents`, data, {
    });
  }

  getAllExotelSupervisorList(): Observable<any> {
    let data = {
      'user_type': 2
    }
    const formData: FormData = new FormData();
    return this.http.post<any>(`${this.apiUrl}/getReports`, data);
  }

  getAllExotelAgentList(): Observable<any> {
    let data = {
      'user_type': 3
    }
    const formData: FormData = new FormData();
    return this.http.post<any>(`${this.apiUrl}/getReports`, data);
  }

  getAllSupervisorList(): Observable<any> {
    let data = {
      'user_type': 2
    }
    const formData: FormData = new FormData();
    return this.http.post<any>(`${this.apiUrl}/getUserlist`, data);
  }

  getAllAgentList(): Observable<any> {
    let data = {
      'user_type': 3
    }
    return this.http.post<any>(`${this.apiUrl}/getReports`, data);
  }
  getAllSupervisorUploadedList(): Observable<any> {
    let data = {
      'user_type': 2
    }
    const formData: FormData = new FormData();
    return this.http.post<any>(`${this.apiUrl}/getUserInsertDetails`, data);
  }

  
  getAllAgentUploadedList(): Observable<any> {
    let data = {
      'user_type': 3
    }
    return this.http.post<any>(`${this.apiUrl}/getUserInsertDetails`, data);
  }

  getHistoryFileIdWise (data:any): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/getUserInsertDetails`, data);
  }
}


