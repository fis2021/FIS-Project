import { Router } from "express";
import { adminRegister, userLogin, userRegister } from "../controllers/userControllers";


export const userRouter : Router = Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.post("/admin/register", adminRegister);