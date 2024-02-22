import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient) { }

  downloadFile(): Observable<Blob> {
    // Make a GET request to your API endpoint that returns the file
    return this.http.get('YOUR_API_ENDPOINT', { responseType: 'blob' });
  }
}
