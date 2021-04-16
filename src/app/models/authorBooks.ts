import { Author } from "./author";
import { Book } from "./book";

export interface AuthorBooks {
    id: number;
    authorId: number;
    author: Author;
    bookId: number;
    book: Book;

}