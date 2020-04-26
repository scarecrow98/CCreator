import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Application } from 'src/app/models/Application';
import { Page } from 'src/app/models/Page';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-running-app',
  templateUrl: './running-app.component.html',
  styleUrls: ['./running-app.component.scss']
})
export class RunningAppComponent implements OnInit {

  public application: Application;
  public pages: Array<Page>;
  public appUser: AppUser;

  constructor(
    private pageService: PageService,
    private appService: AppService,
    private accountService: AccountService,
    public router: Router) { }

  ngOnInit() {
    this.pageService.getPages().subscribe(resp => {
      this.pages = <Array<Page>>resp.data;
    });

    this.appService.getAppData().subscribe(resp => {
      this.application = <Application>resp.data;
    });

    this.accountService.currentLocalUser().subscribe(resp => {
      if (resp.status) {
        this.appUser = <AppUser>resp.data;
      }
    });

  }

  openNewPageEditor(): void {
    const url = '/app/' + this.appService.getAppSlug() + '/page/edit/new';
    this.router.navigate([ url ]);
  }

}
