import { Book } from "./book";
import { User } from "./user";

export class ReviewParams {
    accountId: number;
    bookId: number;
    content: "This is content";
    createdAt = new Date();
    liked: boolean = false;
    constructor(user: User) {
        this.accountId = user.id;
    }
}