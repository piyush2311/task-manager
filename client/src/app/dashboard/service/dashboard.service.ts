import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  /**
   * get task
   * @returns 
   */
  getTask(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/tasks`)
  }

  /**
   * add task
   * @param data 
   * @returns 
   */
  addTask(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/tasks`, data);
  }

  /**
   * Update task
   * @param id 
   * @param body 
   * @returns 
   */
  updateTask(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/tasks/${id}`, body);
  }

  /**
   * Delete Task
   * @param id 
   * @returns 
   */
  deleteTask(id: any) {
    return this.http.delete<any>(`${environment.apiBaseUrl}/tasks/${id}`)
  }


  /**
   * Get dashboard data
   * @returns 
   */
  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/dashboard`)
  }
}
