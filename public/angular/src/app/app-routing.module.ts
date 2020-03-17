import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RunningAppComponent } from './pages/running-app/running-app.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'app', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'app/:app-slug', component: RunningAppComponent, canActivate: [AuthGuardService],
    children: [
      // { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
