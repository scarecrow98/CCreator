import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Widget } from 'src/app/models/Widget';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'widget',
    template: ``,
    styles: []
})
export class WidgetComponent implements OnInit {

    model: Widget;
    form: FormGroup;

    constructor() { }

    ngOnInit() {

    }

    get validationError() {
        const error = this.form.controls[this.model.id].errors;

        if (error.required) return 'A widget értéke nem lehet üres!'
        if (error.min) return `A widget maximum értéke ${this.model.min_value}!`
        if (error.max) return `A widget maximum értéke ${this.model.max_value}!`
        return '';
    }
}