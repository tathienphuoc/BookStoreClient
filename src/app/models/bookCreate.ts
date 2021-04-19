import { Author } from "./author";
import { Category } from "./category";
import { OrderRecipts } from "./orderRecipts";

export class BookCreate {
    isbn: string;
    title: string;
    image: string;
    summary: string;
    publicationDate: Date;
    quantityInStock: number;
    price: number;
    discount: number;
    sold = 0;
    authors: Author[];
    publisherId: number;
    order_Receipts: OrderRecipts[];
    categories: Category[];
}