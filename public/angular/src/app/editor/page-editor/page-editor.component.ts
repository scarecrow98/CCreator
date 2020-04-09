import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DndDropEvent } from 'ngx-drag-drop';
import { Widget } from 'src/app/models/Widget';
import { Page } from 'src/app/models/Page';
import { PageService } from 'src/app/services/page.service';
import { WidgetType } from 'src/app/models/WidgetType';
import { WidgetService } from 'src/app/services/widget.service';
import { DynamicWidgetDirective } from 'src/app/widgets/dynamic-widget.directive';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent implements OnInit, AfterViewInit {

  @ViewChildren(DynamicWidgetDirective) widgetComponents !: QueryList<DynamicWidgetDirective>;
  @ViewChild('editorViewport', { static: true }) editorViewport: ElementRef;


  public pageModel: Page = new Page();
  public widgetTypes: Array<WidgetType>
  public selected: Widget;
  public createMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private widgetService: WidgetService
  ) { }

  ngOnInit() {
    //ha új page-t hozok létre, akkor csak csinálok egy új page objektumot,
    //ha szerkesztek egy page-t, akkor lekérem az adatait a serviccel
    this.createMode = this.route.snapshot.paramMap.get('page-id') == 'new';

    if (!this.createMode) {
      const pageId = parseInt(this.route.snapshot.paramMap.get('page-id'));
      this.pageService.getPage(pageId).subscribe(resp => {
        if (resp.status) {
          this.pageModel = <Page>resp.data;
        } else {
          console.log(resp.message); //todo
        }
      });
    }

    //elérehető widget típusok lekérése
    this.widgetService.getWidgetTypes().subscribe(resp => {
      if (resp.status) {
        this.widgetTypes = <Array<WidgetType>>resp.data;
      } else {
        console.log(resp.message); //todo
      }
    });

  }

  ngAfterViewInit() {
    // this.widgetComponents.changes.subscribe(res => {
    //   const elems = res.toArray();

    //   for (let elem of elems) {
    //     const component = elem.componentRef.instance;
    //     component.talk();
    //   }
    // });
  }

  savePage(): void {
    this.pageService.savePage(this.pageModel).subscribe(resp => {
      if (resp.status) {
        this.pageModel = <Page>resp.data
      } else {
        //todo: error
      }
    });
  }

  closePageEditor(): void {
    window.history.back();
  }

  newWidgetDropped($event: DndDropEvent): void {
    const widgetType = $event.data.name;
    const widgetTypeId = $event.data.id;
    const widgetX = $event.event.offsetX;
    const widgetY = $event.event.offsetY;

    let widget = new Widget();
    widget.type = widgetType;
    widget.widget_type_id = widgetTypeId;
    widget.x = widgetX;
    widget.y = widgetY;
    widget.id = - (this.pageModel.widgets.length + 1);
    widget.page_id = this.pageModel.id;
    this.pageModel.widgets.push(widget);
  }

  widgetDragged($event: any, widget: Widget): void {

  }

}
