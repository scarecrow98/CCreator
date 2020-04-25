import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { MaterialModule } from '../material/material.module';
import { DndModule } from 'ngx-drag-drop';
import { WidgetsModule } from '../widgets/widgets.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { AppEditorComponent } from './app-editor/app-editor.component';

@NgModule({
  declarations: [
    PageEditorComponent,
    AppEditorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DndModule,
    WidgetsModule,
    DragDropModule,
    FormsModule
  ],
  exports: [
    PageEditorComponent,
    AppEditorComponent
  ],
  entryComponents: [
    AppEditorComponent
  ]
})
export class EditorModule { }
