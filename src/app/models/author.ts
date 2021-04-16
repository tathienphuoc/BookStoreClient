import { Book } from "./book";

export interface Author {
    id: number;
    fullName: string;
    biography: string;
    image: string;
    books: Book[]
}