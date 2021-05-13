import { Book } from "./book";
import { User } from "./user";

export class ShoppingCartParam{
    accountId: number;
    bookId: number;
    quantity: number;
    constructor(accountId: number, bookId: number, quantity: number) {
        this.accountId = accountId;
        this.bookId = bookId;
        this.quantity = quantity;
    }
}