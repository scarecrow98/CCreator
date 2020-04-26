import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/models/Page';
import { PageRecord } from 'src/app/models/PageRecord';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {

  public pageModel: Page = new Page();
  public recordModel: PageRecord = new PageRecord();
  public parentRecordId: number = null;
  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordService: RecordService,
    private pageService: PageService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let recordId = params['record-id'];
      let pageId = params['page-id'];
      this.parentRecordId = params['parent-record-id'] ?  parseInt(params['parent-record-id']) : null;

      this.pageService.getPage(pageId).subscribe(resp => {
        if (resp.status) {
          this.pageModel = <Page>resp.data;
        }
      });

      if (recordId == 'new') recordId = null;

      this.recordService.getRecord(parseInt(pageId), parseInt(recordId)).subscribe(resp => {
        if (resp.status) {
          this.recordModel = <PageRecord> resp.data;
          this.formGroup = this.makeFormGroup();
        }
      });

    });
  }

  saveRecord(): void {
    if (this.formGroup.invalid) {
      this.notificationService.error('A widgetek értékei nem felelnek meg a widgetek megkötéseinek!');
      return;
    }

    this.recordService.saveRecord(this.pageModel.id, this.recordModel, this.parentRecordId).subscribe(resp => {
      if (resp.status) {
        this.router.navigate(['../' + resp.data.recordId], { relativeTo: this.route });
      }
    });
  }

  closeRecordPage(): void {
    if (this.formGroup.dirty) {
      this.notificationService.confirm('A rekord adatain változás történt. Ha kilépsz, a módosítások nem kerülnek mentésre. Biztosan kilépsz?').subscribe(ans => {
        if (ans) {
          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      });
      return;
    }
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  makeFormGroup() {
    let group: any = {};
    for (let widget of this.recordModel.widgets) {
      let formControl = new FormControl(widget.widget_value);
      //validátorok készítése a widgethez

      let validators = [];

      if (widget.required) {
        validators.push(Validators.required);
      }

      if (widget.min_value != null) {
        validators.push(Validators.min(widget.min_value));
      }

      if (widget.max_value != null) {
        validators.push(Validators.max(widget.max_value));
      }
      
      formControl.setValidators(validators);
      group[widget.id] = formControl;
    };

    return new FormGroup(group);
  }
}
