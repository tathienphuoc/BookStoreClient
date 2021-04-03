import { Author } from "./author";

export interface Book {
    isbn: string;
    title: string;
    quantityInStock: string;
    price: string;
    authors : Author[];

}