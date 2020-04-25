import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';
import { Widget } from 'src/app/models/Widget';

@Component({
    selector: 'number-widget',
    template: `
        <mat-form-field appearance="fill"  floatLabel="always">
            <mat-label>{{ model.label }}</mat-label>
            <input matInput type="number" [disabled]="disabled" [(ngModel)]="model.widget_value">     
        </mat-form-field>
  `,
    styles: []
})
export class NumberWidgetComponent extends WidgetComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}