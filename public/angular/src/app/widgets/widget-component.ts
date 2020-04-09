import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Widget } from 'src/app/models/Widget';

@Component({
    selector: 'widget',
    template: ``,
    styles: []
})
export class WidgetComponent implements OnInit {

    model: Widget;
    disabled: boolean = false;

    constructor() { }

    ngOnInit() {
    }

}