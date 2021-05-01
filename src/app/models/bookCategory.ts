import { Category } from "./category";

export interface BookCategory {
    id: number;
    bookId: number;
    categoryId: number;
    category: Category;
}