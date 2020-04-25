import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MatDialog } from '@angular/material';
import { AppEditorComponent } from 'src/app/editor/app-editor/app-editor.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Application } from 'src/app/models/Application';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public apps: Array<any>;

  constructor(
    private dashboardService: DashboardService,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private appService: AppService) { }

  ngOnInit() {
    this.getApps();
  }

  getApps(): void {
    this.dashboardService.getApps().subscribe(resp => {
      this.apps = <Array<any>>resp.data;
    });
  }

  openNewAppDialog(): void {
    const dialogRef = this.matDialog.open(AppEditorComponent, {
      width: '60%',
      height: '80%'
    });
  }

  initDeleteApp(app: Application): void {
    const msg = `Biztosan törölni szeretnéd a(z) ${app.name} nevű alkalmazást? A törlés nem visszavonható művelet!`;
    this.notificationService.confirm(msg).subscribe(ans => {
      if (ans === true) {
        this.deleteApp(app.id);
      }
    });
  }

  deleteApp(appId: number) {
    this.appService.deleteApp(appId).subscribe(resp => {
      if (resp.status) {
        this.getApps();
      }
    });
  }
}
