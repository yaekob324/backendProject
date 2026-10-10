import {login} from "./auth.controller";
import {register} from "./auth.controller";
import {logout} from "./auth.controller";
import {me} from "./auth.controller";
import express from "express";

/* this is to validate the input before processing  */
import {validator} from "../../middleware/validation.middleware";
import {loginSchema} from "../../shared/types/types";
import {registerSchema} from "../../shared/types/types";

export const authRouter = express.Router();

authRouter.post("/login",validator(loginSchema), login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.get("/me", me);