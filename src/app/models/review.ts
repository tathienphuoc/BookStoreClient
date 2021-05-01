import { Book } from "./book";
import { User } from "./user";

export interface Review {
    account: User;
    content: string;
    createdAt: string;
    liked: boolean;
    accountId: number;
    bookId: number;
    book: Book;
}