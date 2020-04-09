import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';

@Component({
    selector: 'textarea-widget',
    template: `
        <mat-form-field>
            <mat-label>{{ model.label }}</mat-label>
            <input matInput type="text" [disabled]="disabled" *ngIf="!model.multi_line">   
            <textarea matInput [disabled]="disabled" *ngIf="model.multi_line"></textarea> 
        </mat-form-field>
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