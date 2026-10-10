import {login} from "./auth.controller";
import {register} from "./auth.controller";
import {logout} from "./auth.controller";
import {me} from "./auth.controller";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.get("/me", me);