import { AppUser } from './AppUser';

export class Application {
    id: number;
    slug: string;
    name: string;
    description: string;
    create_at: string;
    created_by: AppUser;
    host: string;
    db_name: string;
}