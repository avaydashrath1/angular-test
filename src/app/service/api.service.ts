import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Post CSV data
   */
  postCsv(data): Observable<any> {
    return this.http.post(`${environment.apiEndPoint}/save-employee-detail`, data);
  }
}
