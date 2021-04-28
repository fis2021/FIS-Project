import {model, Schema } from 'mongoose';

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    cover: {
        type: String,  //string until we figure out how to store images
        required: false
    }
});

const Book = model("Book", BookSchema);

export default Book;
