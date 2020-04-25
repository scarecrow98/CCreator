import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//custom request interceptor
import { ApiInterceptor } from './shared/api-interceptor';

//custom modules
import { MaterialModule } from './material/material.module';
import { PagesModule } from './pages/pages.module';
import { MainModule } from './main/main.module';
import { EditorModule } from './editor/editor.module';
import { AuthGuardService } from './shared/auth-guard.service';
import { ConfirmDialogComponent } from './services/notification.service';


@NgModule({
  declarations: [
    AppComponent, ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    MainModule,
    EditorModule
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class AppModule { }
