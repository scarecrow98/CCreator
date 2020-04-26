import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DndDropEvent } from 'ngx-drag-drop';
import { Widget } from 'src/app/models/Widget';
import { Page } from 'src/app/models/Page';
import { PageService } from 'src/app/services/page.service';
import { WidgetType } from 'src/app/models/WidgetType';
import { WidgetService } from 'src/app/services/widget.service';
import { DynamicWidgetDirective } from 'src/app/widgets/dynamic-widget.directive';
import { NotificationService } from 'src/app/services/notification.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { SelectOption } from 'src/app/models/SelectOption';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent implements OnInit, AfterViewInit {

  @ViewChildren(DynamicWidgetDirective) widgetComponents !: QueryList<DynamicWidgetDirective>;
  @ViewChild('editorViewport', { static: true }) editorViewport: ElementRef;

  public pages: Array<Page> = [];
  public pageModel: Page = new Page();
  public widgetTypes: Array<WidgetType>
  public selected: Widget;
  public createMode: boolean;

  public relatedPageIdToAdd: number = null;
  public optionValueToAdd: string = null;
  public emptyFormGroup: FormGroup;
  public pageModelLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private widgetService: WidgetService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.pageModelLoaded = false;

    //ha új page-t hozok létre, akkor csak csinálok egy új page objektumot,
    //ha szerkesztek egy page-t, akkor lekérem az adatait a serviccel
    this.createMode = this.route.snapshot.paramMap.get('page-id') == 'new';

    if (!this.createMode) {
      const pageId = parseInt(this.route.snapshot.paramMap.get('page-id'));
      this.loadPage(pageId);
    } else {
      this.pageModelLoaded = true;
      this.emptyFormGroup = this.getEmptyFormGroup();
    }

    //elérehető widget típusok lekérése
    this.loadWidgetTypes();

    //oldalak lekérése
    this.loadPages();
  }

  ngAfterViewInit() {

  }

  savePage(): void {
    this.pageService.savePage(this.pageModel).subscribe(resp => {
      if (resp.status) {
        const pageId = resp.data.pageId;
        this.loadPage(pageId);
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
    widget.widget_type_id = widgetTypeId;
    widget.widget_type = { name: widgetType, id: widgetTypeId, display_name: '' }
    widget.x = widget.saved_x = widgetX;
    widget.y = widget.saved_y = widgetY;
    widget.id = - (this.pageModel.widgets.length + 1);
    widget.page_id = this.pageModel.id;

    let formControl = new FormControl('');
    formControl.disable();
    this.emptyFormGroup.addControl(widget.id.toString(), formControl);

    this.pageModel.widgets.push(widget);
  }

  widgetDragged($event: CdkDragEnd, widget: Widget): void {
    console.log(widget);
    const transformValues = $event.source.element.nativeElement.style.transform.match(/([\-\d]+)px/g)
    const transformX = parseInt(transformValues[0])
    const transformY = parseInt(transformValues[1])
    
    
    widget.x = widget.saved_x + transformX;
    widget.y = widget.saved_y + transformY;
    // console.log([transformX, transformY], [widget['original_x'], widget['original_y']], [widget.x, widget.y]);
  }

  canPageBeRelated(page: Page): boolean {
    return page.id != this.pageModel.id && this.pageModel.child_pages.filter(x => x.id == page.id).length == 0;
  }

  initAddRelatedPage(): void {
    if (!this.relatedPageIdToAdd) {
      this.notificationService.error('Nincs kiválasztva a felvenni kívánt oldal!');
      return;
    }

    const page = this.pages.find(x => x.id == this.relatedPageIdToAdd);
    
    const msg = `Biztosan fel akarod venni a(z) ${page.title} oldalt alá rendelt oldalként? Azt az oldalt már nem fogod tudni felvenni más oldalak alá!`;
    this.notificationService.confirm(msg).subscribe(ans => {
      if (ans === true) {
        this.addRelatedPage();
      }
    });
  }

  initDeleteWidget(widget: Widget): void {
    this.notificationService.confirm('Biztosan törölni akarod a widgetet? Az oldal összes rekordjának összes ezen mező beli értéke el fog veszni!').subscribe(ans => {
      if (ans === true) {
        widget.deleted = true;
      }
    });
  }

  addOptionToSelectedWidget(): void {
    if (this.optionValueToAdd == '' || !this.optionValueToAdd) {
      this.notificationService.error('A listaelem értéke nem lehet üres!');
      return;
    }
    const component = this.widgetComponents.toArray().find(x => x.componentRef.instance.model.id == this.selected.id);
    component.componentRef.instance.addOption(this.optionValueToAdd);
  }

  addRelatedPage(): void {
    const parentPageId = this.pageModel.id;
    const childPageId = this.relatedPageIdToAdd;
    this.relatedPageIdToAdd = null;

    this.pageService.makePageRelation(parentPageId, childPageId).subscribe(resp => {
      if (resp.status) {
        this.loadPage(this.pageModel.id);
      }
    });
  }

  loadPage(pageId: number): void {
    this.pageService.getPage(pageId).subscribe(resp => {
      if (resp.status) {
        this.pageModel = <Page>resp.data;
        this.emptyFormGroup = this.getEmptyFormGroup();
        this.pageModelLoaded = true;
      }
    });
  }

  loadWidgetTypes(): void {
    this.widgetService.getWidgetTypes().subscribe(resp => {
      if (resp.status) {
        this.widgetTypes = <Array<WidgetType>>resp.data;
      } else {
        console.log(resp.message); //todo
      }
    });
  }

  loadPages(): void {
    this.pageService.getPages().subscribe(resp => {
      if (resp.status) {
        this.pages = <Array<Page>>resp.data;
      }
    });
  }

  getEmptyFormGroup() {
    let group: any = {};
    for (let widget of this.pageModel.widgets) {
      let formControl = new FormControl('');
      formControl.disable();
      group[widget.id] = formControl;
    };

    return new FormGroup(group);
  }

}
