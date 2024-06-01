

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiUrl = environment.BASE_URL;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }


  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  login(data: object) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string, user_type: string, user_id: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem('user_type', user_type);
    localStorage.setItem('user_id', user_id);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getAllFileIdWiseLog(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getUserInsertDetails`, data);
  }



  // getHeaders(): HttpHeaders {
  //   const token = this.getToken();
  //   return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // }
  logout() {
 
    return this.http.post<any>(`${this.apiUrl}/logout`, this.tokenKey);

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
    return this.http.post<any>(`${this.apiUrl}/getAllReports`, data);
  }

  // getAllSupervisorList(): Observable<any> {
  //   let data = {
  //     'user_type': 2
  //   }
  //   const formData: FormData = new FormData();
  //   return this.http.post<any>(`${this.apiUrl}/getActiveUserList`, data);
  // }
  getAllSupervisorList(): Observable<any> {
    let data = {
      'user_type': 2
    }
    const formData: FormData = new FormData();
    return this.http.post<any>(`${this.apiUrl}/getUserlist`, data);
  }
  // getAllUsersList(): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/getUserlist`, null);
  // }
  getAllUsersList(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getUserlist`, data);
  }

  getAllAgentbySuperviserList(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/getActiveUserList`, data);
  }
  // getAllAgentbySuperviserList(data: any): Observable<any> {

  //   return this.http.post<any>(`${this.apiUrl}/getUserlist`, data);
  // }
  getAllAgentbytimeframe(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/getAgentReportsSingleTimeSlotWise`, data);
  }


  getCallLogSingleRow(data:any): Observable<any> {
 
    return this.http.post<any>(`${this.apiUrl}/getAgentReportsSingleRow`, data);
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
    return this.http.post<any>(`${this.apiUrl}/getUserInsertDetails`, data);
  }
 

  getAllAgentUploadedList(): Observable<any> {
    let data = {
      'user_type': 3
    }
    return this.http.post<any>(`${this.apiUrl}/getUserInsertDetails`, data);
  }
  getAllfailedList(data:any): Observable<any> {
   
    return this.http.post<any>(`${this.apiUrl}/getAgentNotInsertCallDetails`, data);
  }

  getHistoryFileIdWise(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/getUserInsertDetails`, data);
  }
  downloadbyFileIdWise(data: any, type: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/downloadFile?fileId=` + data + `&type=` + type);
  }

  changepassword(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/changePassword`, data);
  }
  getAllUsersList1(data: any): Observable<any> {

    // const formData: FormData = new FormData();
    return this.http.post<any>(`${this.apiUrl}/getUserlist`, data);
  }
  getOtpbymobile(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/sendOTP`, data);
  }
  resetpassword(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/resetPassword`, data);
  }
  updateuser(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/updateUser`, data);
  }

  getsingleuser(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/getUser`, data);
  }
  resetuserpassword(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/resetUserPassword`, data);
  }


  deleteUser(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/deleteUser`, data);
  }

  changeUserStatus(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/changeUserStatus`, data);
  }
  getunderagentreports(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getAllReports`, data);
  }

  getDashboardStatss(): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/getDashboardStats`, null);
  }
  getDashboardStatsagents(id: any): Observable<any> {
    let data = {
      'id': id
    }
    return this.http.post<any>(`${this.apiUrl}/getDashboardStats`, data);
  }

}


