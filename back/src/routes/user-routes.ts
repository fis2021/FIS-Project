import { Router } from "express";
import { verifyToken } from "../controllers/authJwt";
import { adminRegister, userLogin, userRegister } from "../controllers/userControllers";


export const userRouter : Router = Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.post("/admin/register", adminRegister);
userRouter.post("/verifyToken", verifyToken);