import { Router } from "express";
import { verifyToken } from "../controllers/authJwt";
import { removeFromFavorites, updateFavorites } from "../controllers/favoritesController";
import { adminRegister, getCurrentUser, userLogin, userRegister } from "../controllers/userControllers";


export const userRouter : Router = Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.post("/current-user/:email" ,getCurrentUser);
userRouter.post("/admin/register", adminRegister);
userRouter.post("/verifyToken", verifyToken);
userRouter.post("/favorite/add", updateFavorites);
userRouter.post("/favorite/remove", removeFromFavorites);