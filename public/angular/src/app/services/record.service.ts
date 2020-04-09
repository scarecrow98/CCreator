import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  getRecord(recordId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/app/record/getRecord', { recordId });
  }
}
