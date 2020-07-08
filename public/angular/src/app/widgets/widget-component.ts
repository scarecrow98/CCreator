import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
import { Widget } from 'src/app/models/Widget';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'widget',
    template: ``,
    styles: []
})
export class WidgetComponent implements OnInit {

    model: Widget;
    form: FormGroup;
    @Input() valueSubject: Subject<any>;


    constructor() {
    }

    ngOnInit() {

    }

    protected broadcastValueChange(): void {
        this.valueSubject.next({
            value: this.model.widget_value,
            sender: this.model.id
        });
    }

    get validationError() {
        const error = this.form.controls[this.model.id].errors;

        if (error.required) return 'A widget értéke nem lehet üres!'
        if (error.min) return `A widget maximum értéke ${this.model.min_value}!`
        if (error.max) return `A widget maximum értéke ${this.model.max_value}!`
        return '';
    }
}