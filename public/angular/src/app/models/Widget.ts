export class Widget {
    id: number = -1;
    page_id: number = -1;
    widget_type_id: number;
    label: string = 'Új mező';
    default_value: string = '';
    x: number = 0;
    y: number = 0;
    type: string = '';
    multi_line: boolean = false;

    persisted: boolean = false;
}