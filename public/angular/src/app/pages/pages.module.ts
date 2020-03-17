import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//pages
import { LoginComponent } from './login/login.component'
//dependencies for page components
import { MaterialModule } from '../material/material.module'
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RunningAppComponent } from './running-app/running-app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    RunningAppComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    DashboardComponent,
    RunningAppComponent
  ]
})
export class PagesModule { }
