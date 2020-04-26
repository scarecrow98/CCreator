import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { PageRecord } from '../models/PageRecord';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  getRecord(pageId: number, recordId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/app/record/getRecord', { pageId, recordId });
  }

  saveRecord(pageId: number, record: PageRecord, parentRecordId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/app/record/saveRecord', { record, pageId, parentRecordId });
  }

  getRecords(pageId: number, parentRecordId: number, pageInfo: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/app/record/getRecords', { pageId, parentRecordId, pageInfo });
  }
}
