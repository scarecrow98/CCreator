import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget-component';
import { Widget } from 'src/app/models/Widget';

@Component({
    selector: 'number-widget',
    template: `
        <div [formGroup]="form">
            <mat-form-field appearance="fill"  floatLabel="always">
                <mat-label>{{ model.label }}</mat-label>
                <input matInput type="number" [(ngModel)]="model.widget_value" (change)="broadcastValueChange()" [formControlName]="model.id.toString()">     
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
        this.valueSubject.subscribe({
            next: (subject) => {
                console.log(this.model.id + ' értesült a változtatásról', subject);


                //szimuláljuk, hogy a hatos számított mező, és kiszámolja az értéket
                if (this.model.id === 6) {
                    this.model.widget_value = subject.value;
                }
            }
        });
    }
}