import { Book } from "./book";
import { User } from "./user";

export class ReviewParams {
    accountId: number;
    bookId: number;
    email: string;
    content: "This is content";
    createdAt = new Date();
    liked: boolean;
    constructor(user: any) {
        this.accountId = user.id;
        this.email = user.email
    }
}