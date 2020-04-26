import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';
import { Widget } from 'src/app/models/Widget';

@Component({
    selector: 'number-widget',
    template: `
        <div [formGroup]="form">
            <mat-form-field appearance="fill"  floatLabel="always">
                <mat-label>{{ model.label }}</mat-label>
                <input matInput type="number" [(ngModel)]="model.widget_value"  [formControlName]="model.id.toString()">     
                <mat-error *ngIf="form?.controls[model.id.toString()]?.invalid">{{ validationError }}</mat-error>
            </mat-form-field>
        </div>
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