import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component'
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { RecordPageComponent } from './record-page/record-page.component';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  declarations: [
    ListPageComponent,
    RecordPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    WidgetsModule
  ],
  exports: [
    ListPageComponent,
    RecordPageComponent
  ],
  entryComponents: [
    RecordPageComponent
  ]
})
export class MainModule { }
