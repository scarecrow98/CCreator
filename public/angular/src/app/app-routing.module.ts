import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RunningAppComponent } from './pages/running-app/running-app.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { ListPageComponent } from './main/list-page/list-page.component';
import { PageEditorComponent } from './editor/page-editor/page-editor.component';
import { RecordPageComponent } from './main/record-page/record-page.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'app', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'app/:app-slug', component: RunningAppComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'page/:page-id', component: ListPageComponent },
      { path: 'page/:page-id/record/:record-id', component: RecordPageComponent },
      { path: 'page/edit/:page-id', component: PageEditorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
