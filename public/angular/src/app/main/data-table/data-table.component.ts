import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableModel } from 'src/app/models/TableModel';
import { Page } from 'src/app/models/Page';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'ccreator-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  private _tableModel: TableModel;
  @Input() set tableModel(value: TableModel) {
    this._tableModel = value;
    this.refreshPaginator();
  }
  get tableModel() {
    return this._tableModel;
  }

  @Output('paginatorChanged') paginatorChanged: EventEmitter<any> = new EventEmitter();

  @Input('pageModel') pageModel: Page;
  public pageSizes = [10, 25, 50, 100];
  public currentPageSize = 25;
  public currentPageNumber = 1;
  public pageCount = 0;
  public pageNumbers = [];

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService) { }

  ngOnInit() {   }

  initDeleteRecord(): void {
    this.notificationService.confirm('Biztosan törölni akarod ezt az adatrekordot?').subscribe(ans => {
      
    });
  }

  get pageInfo() {
    return { pageSize: this.currentPageSize, pageNumber: this.currentPageNumber }
  }

  refreshPaginator(): void {
    this.pageCount = Math.ceil(this._tableModel.total / this.currentPageSize);
    this.pageNumbers = Array(this.pageCount).fill(0).map((x, i) => i + 1);
  }

  paginatorChangedHandler(event: any = null): void {
    this.refreshPaginator();

    if (this.currentPageNumber > this.pageCount) {
      this.currentPageNumber = 1;
    }

    const pageInfo = {
      pageNumber: this.currentPageNumber,
      pageSize: this.currentPageSize
    };
    this.paginatorChanged.emit(pageInfo);
  }

  nextRecordPage(): void {
    if (this.currentPageNumber < this.pageCount) {
      this.currentPageNumber++;
      this.paginatorChangedHandler();
    }
  }

  prevRecordPage(): void {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber--;
      this.paginatorChangedHandler();
    }
  }

  openRecordPage(recordId: number, parentRecordId: number): void {
    let url = '/app/' + this.appService.getAppSlug() + '/page/' + this.pageModel.id + '/';
    
    //ha van parent-je a rekord-nak akkor olyan url-ra irányítom
    if (parentRecordId == null) {
      url += 'record/' + recordId;
    } else {
      url += 'parent-record/' + parentRecordId + '/record/' + recordId;
    }

    this.router.navigate([url]);
  }
}
