import { AuthorBooks } from "./authorBooks";
import { BookCategory } from "./bookCategory";
import { OrderRecipts } from "./orderRecipts";
import { Publisher } from "./publisher";
import { Review } from "./review";

export interface Book {
  publisher: Publisher;
  order_Receipts: OrderRecipts[];
  reviews: Review[];
  authorBooks: AuthorBooks[];
  bookCategories: BookCategory[];
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