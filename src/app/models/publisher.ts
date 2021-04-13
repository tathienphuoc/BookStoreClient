import { Book } from "./book";

export interface Publisher {
    books: Book[];
    id: number;
    name: string;
    image: string;
  }