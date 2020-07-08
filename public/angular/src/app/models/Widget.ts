import { WidgetType } from './WidgetType';
import { SelectOption } from './SelectOption';

export class Widget {
    id: number = -1;
    page_id: number = -1;
    widget_type_id: number;
    label: string = 'Új mező';
    default_value: string = '';
    required: boolean = false;
    x: number = 0;
    y: number = 0;
    widget_type: WidgetType = null;
    multi_line: boolean = false;
    options: Array<SelectOption> = [];
    min_value: number = null;
    max_value: number = null;

    widget_value: any = null;
    value_exists: boolean = false;

    saved_x: number = 0;
    saved_y: number = 0;
    deleted: boolean = false;
}