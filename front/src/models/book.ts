export interface Book {
    _id: string
    title: string;
    author?: string;
    genre: string;
    description: string;
    coverUrl?: string;
}