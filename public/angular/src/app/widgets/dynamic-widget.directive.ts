import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit, Output } from '@angular/core';
import { TextareaWidgetComponent } from './components/textarea-widget-component';
import { SelectWidgetComponent } from './components/select-widget-component';
import { DateWidgetComponent } from './components/date-widget-component';
import { NumberWidgetComponent } from './components/number-widget-component';
import { Widget } from '../models/Widget';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';



const componentMap = {
  1: TextareaWidgetComponent,
  2: NumberWidgetComponent,
  3: SelectWidgetComponent,
  4: DateWidgetComponent
}

@Directive({
  selector: '[dynamicWidget]'
})
export class DynamicWidgetDirective implements OnInit {

  @Input('model') model: Widget;
  @Input('form') form: FormGroup;
  @Input('valueSubject') valueSubject: Subject<any>;
  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    const componentType = componentMap[this.model.widget_type_id];
    const factory = this.resolver.resolveComponentFactory(componentType);

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.model = this.model;
    this.componentRef.instance.form = this.form;
    this.componentRef.instance.valueSubject = this.valueSubject;
  }

}
