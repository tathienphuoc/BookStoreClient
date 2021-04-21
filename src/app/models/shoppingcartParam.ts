import { Book } from "./book";
import { User } from "./user";

export class ShoppingCartParam{
    accountId: number;
    bookId: number;
    constructor(accountId: number, bookId: number) {
        this.accountId = accountId;
        this.bookId = bookId;
    }
}