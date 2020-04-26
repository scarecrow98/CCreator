import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';
import { Widget } from 'src/app/models/Widget';

@Component({
    selector: 'date-widget',
    template: `
        <div [formGroup]="form">
            <mat-form-field appearance="fill" floatLabel="always">
                <mat-label>{{ model.label }}</mat-label>
                <input matInput [matDatepicker]="picker" [(ngModel)]="model.widget_value" [formControlName]="model.id.toString()">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="form?.controls[model.id.toString()]?.invalid">{{ validationError }}</mat-error>
            </mat-form-field>
        </div>
  `,
    styles: []
})
export class DateWidgetComponent extends WidgetComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}