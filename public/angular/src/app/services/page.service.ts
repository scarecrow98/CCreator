import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { Page } from '../models/Page';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  getPages(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('/app/page/getPages');
  }

  getPage(pageId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/app/page/getPage', { pageId });
  }

  savePage(page: Page): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/app/page/savePage', { page });
  }

  makePageRelation(parentPageId: number, childPageId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/app/page/makeRelation', { parentPageId, childPageId });
  }
}
