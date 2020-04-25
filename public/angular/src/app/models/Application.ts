import { AppUser } from './AppUser';

export class Application {
    id: number = -1;
    slug: string = '';
    name: string = '';
    description: string = '';
    create_at: string;
    created_by: AppUser = null;
    host: string = '';
    db_name: string = ''; 
}