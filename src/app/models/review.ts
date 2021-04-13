import { User } from "./user";

export interface Reivew {
    account: User;
    content: string;
    createdAt: string;
    liked: boolean;
    accountId: number;
    bookId: number;
}