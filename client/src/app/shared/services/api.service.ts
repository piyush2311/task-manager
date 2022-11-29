import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> { 
    
    return this.http.get(`${environment.apiBaseUrl}${path}`, { params })
    .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(
      `${environment.apiBaseUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body:any): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  delete(path:any): Observable<any> {
    return this.http.delete(
      `${environment.apiBaseUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}