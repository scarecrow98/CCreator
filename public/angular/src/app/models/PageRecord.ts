import { AppUser } from './AppUser';
import { Widget } from './Widget';

export class PageRecord {
    id: number = -1;
    page_id: number = -1;
    created_by: AppUser = null;
    created_at: string = null;
    last_modified_by: AppUser = null;
    last_modified_at: string = '';
    widgets: Array<Widget> = new Array<Widget>(0);
    parent_record_id: number = null;
}