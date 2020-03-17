import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/account/login', { email, password });
  }

  pageTest(appSlug: string) {
    this.http.post('/app/page-test', { 'app-slug': appSlug }).subscribe(resp => {
      console.log(resp);
    });
  }

  isAuthenticated(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('/account/isAuthenticated');
  }
}
