import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Widget } from 'src/app/models/Widget';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'widget',
    template: ``,
    styles: []
})
export class WidgetComponent implements OnInit {

    model: Widget;
    disabled: boolean = false;
    errorMessage: string = '';
    isValid: boolean = true;

    constructor() { }

    ngOnInit() {

    }

    validate(): void {
        this.isValid = true;
        this.errorMessage = '';

        const required = true;
        if (required && this.model.widget_value == '' || !this.model.widget_value) {
            this.isValid = false;
            this.errorMessage = 'A mezőm kitöltése kötelező';
        }
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }

}