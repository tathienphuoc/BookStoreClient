import { Book } from "./book";
import { Item } from "./item";
import { User } from "./user";
export interface Cart {
    id: number;
    account: User;
    items: Item[];
    lastUpdate: string;
}