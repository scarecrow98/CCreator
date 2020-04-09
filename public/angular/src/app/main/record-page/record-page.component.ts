import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/models/Page';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {

  private pageModel: Page = new Page();

  constructor(
    private route: ActivatedRoute,
    private recordService: RecordService,
    private pageSerice: PageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const recordId = params['record-id'];
      const pageId = params['page-id'];

      this.pageSerice.getPage(pageId).subscribe(resp => {
        if (resp.status) {
          this.pageModel = <Page>resp.data;
        } else {
          //todo: error
        }
      });


      if (recordId == 'new') {
      } else {
        this.recordService.getRecord(parseInt(recordId)).subscribe(resp => {

        });
      }
    });
  }

}
