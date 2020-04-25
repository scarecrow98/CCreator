import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicWidgetDirective } from './dynamic-widget.directive';
//custom widgets
import { WidgetComponent } from './widget-component'
import { TextareaWidgetComponent } from './components/textarea-widget-component';
import { SelectWidgetComponent } from './components/select-widget-component';
import { DateWidgetComponent } from './components/date-widget-component';
import { NumberWidgetComponent } from './components/number-widget-component';

import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    WidgetComponent,
    TextareaWidgetComponent,
    SelectWidgetComponent,
    DateWidgetComponent,
    NumberWidgetComponent,
    DynamicWidgetDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    TextareaWidgetComponent,
    SelectWidgetComponent,
    DateWidgetComponent,
    DynamicWidgetDirective,
    NumberWidgetComponent,
    WidgetComponent
  ],
  entryComponents: [
    WidgetComponent,
    SelectWidgetComponent,
    TextareaWidgetComponent,
    DateWidgetComponent,
    NumberWidgetComponent
  ]
})
export class WidgetsModule { }
