import {model, Schema } from 'mongoose';

const ReviewSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    }
})

const Review = model("Review", ReviewSchema);

export default Review;