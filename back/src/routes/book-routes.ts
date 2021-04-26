import { Router } from "express";
import { deleteBook, editBook, getAllBooks, getSingleBook, uploadBook } from "../controllers/bookController";


export const bookRouter : Router = Router();

bookRouter.get('/books',getAllBooks);
bookRouter.get('/books/:id',getSingleBook);
bookRouter.post('/books',uploadBook);
bookRouter.put('/books/:id',editBook);
bookRouter.delete('/books/:id',deleteBook);