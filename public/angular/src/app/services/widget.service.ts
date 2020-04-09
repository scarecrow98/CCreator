import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private http: HttpClient) { }

  getWidgetTypes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('/app/widget/getWidgetTypes');
  }
}
