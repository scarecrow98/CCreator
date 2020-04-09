import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';
import { Widget } from 'src/app/models/Widget';

@Component({
    selector: 'select-widget',
    template: `
        <mat-form-field style="width: 180px">
            <mat-label>{{ model.label }}</mat-label>
            <mat-select placeholder="Válassz egy opciót" [disabled]="disabled"> 
                <mat-option value="1">1</mat-option>  
                <mat-option value="2">2</mat-option>  
                <mat-option value="3">3</mat-option>  
                <mat-option value="4">4</mat-option>  
            </mat-select>   
        </mat-form-field>
  `,
    styles: []
})
export class SelectWidgetComponent extends WidgetComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}