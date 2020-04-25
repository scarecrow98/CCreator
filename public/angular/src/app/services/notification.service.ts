import { Injectable, Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'confirm-dialog-component',
  template: `
    <h1 mat-dialog-title>
      Figyelmeztetés!
      <mat-icon style="vertical-align: middle; color: red; margin-left: 12px;">warning</mat-icon>
    </h1>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button [mat-dialog-close]="true">Igen</button>
      <button mat-raised-button [mat-dialog-close]="false">Nem</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: MatSnackBar, private dialog: MatDialog) { }

  error(message: string): void {
    this.toast.open(message, 'OK', {
      duration: 3000
    });
  }

  success(message: string):void  {
    this.toast.open(message, 'OK', {
      duration: 3000
    });
  }

  confirm(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message }
    });

    return dialogRef.afterClosed();
  }

}
