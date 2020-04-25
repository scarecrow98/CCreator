import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';
import { Widget } from 'src/app/models/Widget';

@Component({
    selector: 'date-widget',
    template: `
        <mat-form-field appearance="fill" floatLabel="always">
            <mat-label>{{ model.label }}</mat-label>
            <input matInput [matDatepicker]="picker" [disabled]="disabled" [(ngModel)]="model.widget_value">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
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