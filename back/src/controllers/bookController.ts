import { Response, Request } from 'express'
import Book from '../models/Book'

export const getAllBooks = async(req: Request, res: Response): Promise<Response> => {
    try{

        const result = await Book.find().sort({createdAt: -1});
        return res.status(200).json(result);

    }catch(err){

        return res.status(404).json(err);
    }
}

export const getSingleBook = async (req: Request, res: Response): Promise<Response> => {
    try{

        const result = await Book.findById(req.params.id);
        return res.status(200).json(result); 
    }catch(err){

        return res.status(404).json(err);
    }
}

export const uploadBook = async (req: Request, res: Response): Promise<Response> =>{
    try{
        console.log(req.body)
        const book = new Book(req.body)
        const result = await book.save();
        return res.status(200).json(result);
    }catch(err){
        
        return res.status(404).json(err);
    }
}

export const editBook = async (req: Request, res: Response): Promise<Response> => {
    try{

        const result = await Book.findOneAndUpdate({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
        })
        return res.status(200).json(result);
    }catch(err){
        
        return res.status(404).json(err);
    }
}

export const deleteBook = async (req: Request, res: Response): Promise<Response> =>{
    try{

        const result = await Book.findByIdAndDelete(req.params.id);
        return res.status(200).json(result);
    }catch(err){
        
        return res.status(404).json(err);
    }
}