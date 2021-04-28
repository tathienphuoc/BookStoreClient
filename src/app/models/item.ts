import { Book } from "./book";

export interface Item{
    book: Book;
    id: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    bookId: number;
}