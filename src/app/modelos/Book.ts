
export interface Book{
    key: string;
    title?: string;
    subtitle?: string;
    author_name: string;
    subjects?: string[];
    first_publish_year: number;
    cover_i: string;
    cover_edition_key?: string;
    authors?:{name: string} [];
    description?: any;
    covers?: string[];
    first_publish_date?: string;
}