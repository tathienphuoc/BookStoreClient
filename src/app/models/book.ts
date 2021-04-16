import { Author } from "./author";
import { AuthorBooks } from "./authorBooks";
import { OrderRecipts } from "./orderRecipts";
import { Publisher } from "./publisher";
import { Reivew } from "./review";

export interface Book {
  publisher: Publisher;
  order_Receipts: OrderRecipts[];
  reviews: Reivew[];
  authorBooks: AuthorBooks[];
  id: number;
  isbn: string;
  title: string;
  image: string;
  summary: string;
  publicationDate: string;
  quantityInStock: number;
  price: number;
  sold: number;
  discount: number;
  publisherId: number;
}