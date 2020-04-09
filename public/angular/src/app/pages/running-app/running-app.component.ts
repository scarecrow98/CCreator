import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Application } from 'src/app/models/Application';
import { Page } from 'src/app/models/Page';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-running-app',
  templateUrl: './running-app.component.html',
  styleUrls: ['./running-app.component.scss']
})
export class RunningAppComponent implements OnInit {

  public application: Application;
  public pages: Array<Page>;

  constructor(
    private pageService: PageService,
    private appService: AppService,
    public router: Router) { }

  ngOnInit() {
    this.pageService.getPages().subscribe(resp => {
      this.pages = <Array<Page>>resp.data;
    });

    this.appService.getAppData().subscribe(resp => {
      this.application = <Application>resp.data;
    });

  }

}
