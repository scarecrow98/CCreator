import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';

@Component({
    selector: 'textarea-widget',
    template: `
        <div [formGroup]="form">
            <mat-form-field appearance="fill"  floatLabel="always">
                <mat-label>{{ model.label }}</mat-label>
                <input matInput type="text" *ngIf="!model.multi_line" [(ngModel)]="model.widget_value" [formControlName]="model.id.toString()">   
                <textarea matInput *ngIf="model.multi_line" [(ngModel)]="model.widget_value" [formControlName]="model.id.toString()"></textarea>
                <mat-error *ngIf="form?.controls[model.id.toString()]?.invalid">{{ validationError }}</mat-error>
            </mat-form-field>
        </div>
  `,
    styles: []
})
export class TextareaWidgetComponent extends WidgetComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
        
    }
}