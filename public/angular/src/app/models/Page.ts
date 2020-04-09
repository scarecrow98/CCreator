import { AppUser } from './AppUser';
import { Widget } from './Widget';

export class Page {
    id: number = -1;
    title: string = null;
    description: string = null;
    icon: string = null;
    color: string = null;
    created_by: AppUser = null;
    created_at: string = null;
    last_modified_by: AppUser = null;
    widgets: Array<Widget> = new Array<Widget>(0);
}