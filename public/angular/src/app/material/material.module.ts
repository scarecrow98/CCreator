import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatDialogModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';


@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [
    MatNativeDateModule
  ]
})
export class MaterialModule { }
