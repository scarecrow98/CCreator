import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';

@Component({
    selector: 'textarea-widget',
    template: `
        <mat-form-field appearance="fill"  floatLabel="always">
            <mat-label>{{ model.label }}</mat-label>
            <input matInput type="text" [disabled]="disabled" *ngIf="!model.multi_line" [(ngModel)]="model.widget_value" (blur)="validate()">   
            <textarea matInput [disabled]="disabled" *ngIf="model.multi_line"></textarea>
            <div *ngIf="!isValid" class="widget-error">{{ getErrorMessage() }}</div>
        </mat-form-field>
  `,
    styles: []
})
export class TextareaWidgetComponent extends WidgetComponent implements OnInit, AfterViewInit {


    constructor() {
        super();
    }


    ngOnInit() {
    }

    ngAfterViewInit(): void {

    }
}