import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-running-app',
  templateUrl: './running-app.component.html',
  styleUrls: ['./running-app.component.scss']
})
export class RunningAppComponent implements OnInit {

  public appSlug: string = '';

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.appSlug = this.route.snapshot.params['app-slug'];

    this.accountService.pageTest(this.appSlug);
  }

}
