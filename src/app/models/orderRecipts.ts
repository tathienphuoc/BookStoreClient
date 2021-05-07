import { Item } from "./item";

export interface OrderRecipts {
    id: number;
    createAt: Date;
    fullName: string;
    phone: string;
    totalPrice: number;
    accountId: number;
    orderItems: Item[];
}