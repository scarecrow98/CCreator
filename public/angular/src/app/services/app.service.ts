import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { Application } from '../models/Application';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getAppData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('/app/getAppData');
  }

  createApp(app: Application): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/dashboard/createApp', { app });
  }

  deleteApp(appId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/dashboard/deleteApp', { appId });
  }
  
  getAppSlug(): string {
    const path = window.location.pathname; //pl.: app/test/...
    const parts = path.substring(1).split('/');

    if (parts.length >= 2) {
        return parts[1];
    }
    return '';
}
}
