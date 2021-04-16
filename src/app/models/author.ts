import { Book } from "./book";

export interface Author {
    fullName: string;
    biography: string;
    image: string;
    books: Book[]
}