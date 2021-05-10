import { DeliveryMethod } from "./deliveryMethod";
import { Item } from "./item";

export interface OrderRecipts {
    id: number;
    createAt: Date;
    fullName: string;
    phone: string;
    totalPrice: number;
    accountId: number;
    deliveryMethod: DeliveryMethod;
    orderItems: Item[];
}