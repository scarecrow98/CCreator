import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/models/Page';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TableModel } from 'src/app/models/TableModel';
import { RecordService } from 'src/app/services/record.service';
import { AppService } from 'src/app/services/app.service';
import { DataTableComponent } from '../data-table/data-table.component';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  public page: Page = new Page();
  public pageId: number;
  public tableModel: TableModel = new TableModel()
  public parentRecordId: number = null;
  @ViewChild('dataTable', { static: true }) dataTable: DataTableComponent;

  constructor(
    private router: Router,
    private pageService: PageService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private recordService: RecordService,
    private appService: AppService,
    private printService: PrintService
  ) {


  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.pageId = parseInt(params['page-id']);
      this.parentRecordId = params['parent-record-id'] ?  parseInt(params['parent-record-id']) : null;

      this.loadData({ pageSize: 25, pageNumber: 1 });
    });

  }

  printPage(): void {
    const pageInfo = this.dataTable.pageInfo;
    const pageId = this.page.id;
    const parentRecordId = this.parentRecordId;
    this.printService.printPage(pageId, parentRecordId, pageInfo);
  }

  openNewRecordPage(): void {
    let url = '/app/' + this.appService.getAppSlug() + '/page/' + this.page.id + '/';
    if (this.parentRecordId == null) {
      url += 'record/new';
    } else {
      url += 'parent-record/' + this.parentRecordId + '/record/new';
    }
    this.router.navigate([ url ]);
  }

  openPageEditor(): void {
    const url = '/app/' + this.appService.getAppSlug() + '/page/edit/' + this.page.id;
    this.router.navigate([  url ]);
  }

  reloadTable(pageInfo: any): void {
    this.loadData(pageInfo);
  }

  loadData(pageInfo: any): void {
    this.recordService.getRecords(this.pageId, this.parentRecordId, {
      pageSize: pageInfo.pageSize,
      pageNumber: pageInfo.pageNumber
    }).subscribe(resp => {

      if (resp.status == true) {
        this.tableModel = <TableModel>resp.data.table_model;
        this.page = <Page>resp.data.page;
      }
    });
  }
}
