import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';
import { Widget } from 'src/app/models/Widget';
import { SelectOption } from 'src/app/models/SelectOption';

@Component({
    selector: 'select-widget',
    template: `
        <mat-form-field style="width: 180px" appearance="fill"  floatLabel="always">
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

    addOption(value: string): void {
        let key = -1;
        if (this.model.options.length == 0) {
            key = 1;
        } else {
            key = this.model.options.map(x => x.key).sort().pop() + 1;
        }
        const option = new SelectOption();
        option.key = key;
        option.value = value;
        this.model.options.push(option);
        console.log(option);
    }
}