import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public apps: Array<any>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getApps().subscribe(resp => {
      this.apps = <Array<any>>resp.data;
    });
  }

}
