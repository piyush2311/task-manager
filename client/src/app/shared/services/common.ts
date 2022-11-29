import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  // get(method: string, params: any): any {
  //   return this.http.get(environment.apiBaseUrl + '/' + method);
  // }

  // post(method: string, data: any): any {
  //   return this.http.post(environment.apiBaseUrl + '/' + method, data);
  // }

  // put(method: string, id: string, data: any): any {
  //   return this.http.put(environment.apiBaseUrl + '/' + method + '/' + id, data);
  // }

  // delete(method: string, id: any): any {
  //   const url = `${environment.apiBaseUrl}/${method}/${id}`;
  //   return this.http.delete(environment.apiBaseUrl + '/' + method + '/' + id);
  // }
}
