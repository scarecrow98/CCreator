import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private http: HttpClient) { }

  // printPageRecord(pageId: number, recordId: number) {
  //   return this.http.post('/app/print/printPageRecord', { pageId, recordId });
  // }

  printPage(pageId: number, parentRecordId: number, pageInfo: any)  {
    this.http.post('/app/print/printPage', { pageId, parentRecordId, pageInfo }, {
      responseType: "arraybuffer"
    }).subscribe(resp => {
      this.downloadFile(resp);
    });
  }

  downloadFile(data: ArrayBuffer): void {
      const blob = new Blob([ data ], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
  }
}
