

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
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

  saveToken(token: string,user_type: string,user_id: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem('user_type', user_type);
    localStorage.setItem('user_id', user_id);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getAllFileIdWiseLog(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getUserInsertDetails`, data);
  }



  // getHeaders(): HttpHeaders {
  //   const token = this.getToken();
  //   return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // }
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_id');
  }
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.apiUrl}/uploadSupervisers`, formData, {
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
  getAllUsersList(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getUserlist`, null);
  }
 
  getAllAgentbySuperviserList(data:any): Observable<any> {
  
    const formData: FormData = new FormData();
    return this.http.post<any>(`${this.apiUrl}/getUserlist`, data);
  }


  getCallLogSingleRow(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getReportsSingleRow`, data);
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
  downloadbyFileIdWise (data:any,type:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/downloadFile?fileId=`+data+`&type=`+type);
  }

  changepassword (data:any): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/changePassword`, data);
  }
  getAllUsersList1(data:any): Observable<any> {
   
    // const formData: FormData = new FormData();
    return this.http.post<any>(`${this.apiUrl}/getUserlist`, data);
  }
  getOtpbymobile(data:any): Observable<any> {
  
    return this.http.post<any>(`${this.apiUrl}/sendOTP`, data);
  }
  resetpassword(data:any): Observable<any> {
  
    return this.http.post<any>(`${this.apiUrl}/resetPassword`, data);
  }
  updateuser(data:any): Observable<any> {
  
    return this.http.post<any>(`${this.apiUrl}/updateUser`, data);
  }
  
  getsingleuser(data:any): Observable<any> {
  
    return this.http.post<any>(`${this.apiUrl}/getUser`, data);
  }

}


