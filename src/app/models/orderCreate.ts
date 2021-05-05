import { Item } from "./item";

export class OrderCreate {
    fullName: string;
    phone: string;
    email: string;
    cardNumber: string;
    items: Item[];
}