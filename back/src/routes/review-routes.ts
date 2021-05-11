import { Router } from "express";
import { getReviewsForABook, uploadReview } from "../controllers/reviewController";

export const reviewRouter: Router = Router();

reviewRouter.get('/reviews/:id', getReviewsForABook);
reviewRouter.post('/reviews',uploadReview);