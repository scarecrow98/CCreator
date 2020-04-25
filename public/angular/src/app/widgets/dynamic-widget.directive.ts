import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit, Output } from '@angular/core';
import { TextareaWidgetComponent } from './components/textarea-widget-component';
import { SelectWidgetComponent } from './components/select-widget-component';
import { DateWidgetComponent } from './components/date-widget-component';
import { NumberWidgetComponent } from './components/number-widget-component';
import { Widget } from '../models/Widget';



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
  @Input('disabled') disabled: boolean = false;
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
    this.componentRef.instance.disabled = this.disabled;
  }

}
