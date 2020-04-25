import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component'
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { RecordPageComponent } from './record-page/record-page.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { NgxDatatableModule, DatatableComponent } from '@swimlane/ngx-datatable';
import { DataTableComponent } from './data-table/data-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListPageComponent,
    RecordPageComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    WidgetsModule,
    NgxDatatableModule,
    FormsModule
  ],
  exports: [
    ListPageComponent,
    RecordPageComponent,
    DatatableComponent
  ],
  entryComponents: [
    RecordPageComponent
  ]
})
export class MainModule { }
