import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/models/Page';
import { PageRecord } from 'src/app/models/PageRecord';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {

  private pageModel: Page = new Page();
  private recordModel: PageRecord = new PageRecord();
  private parentRecordId: number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordService: RecordService,
    private pageSerice: PageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let recordId = params['record-id'];
      let pageId = params['page-id'];
      this.parentRecordId = params['parent-record-id'] ?  parseInt(params['parent-record-id']) : null;

      this.pageSerice.getPage(pageId).subscribe(resp => {
        if (resp.status) {
          this.pageModel = <Page>resp.data;
        } else {
          //todo: error
        }
      });

      if (recordId == 'new') recordId = null;

      this.recordService.getRecord(parseInt(pageId), parseInt(recordId)).subscribe(resp => {
        if (resp.status) {
          this.recordModel = <PageRecord> resp.data;
        }
      });

    });
  }

  saveRecord(): void {
    this.recordService.saveRecord(this.pageModel.id, this.recordModel, this.parentRecordId).subscribe(resp => {
      if (resp.status) {
        this.router.navigate(['../' + resp.data.recordId], { relativeTo: this.route });
      }
    });
  }

  hexToRgba(hex: string, alpha: number): string {
    if (!hex || hex == '') {
        return 'rgba(255,255,255, 1.0)';
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
