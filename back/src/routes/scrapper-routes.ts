import { Router } from "express";
import { getLivePosts } from "../controllers/scrapperController";

export const scrapperRouter: Router = Router();

scrapperRouter.post("/articles/:email", getLivePosts);
