import { Router } from "express";
import UserController from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/sign-up", UserController.registerUser);

userRouter.post("/login", UserController.loginUser);

userRouter.get("/auth", UserController.authUser);

export default userRouter;
