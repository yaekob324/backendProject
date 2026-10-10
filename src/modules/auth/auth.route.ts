import {login} from "./auth.controller";
import {register} from "./auth.controller";
import {logout} from "./auth.controller";
import {me} from "./auth.controller";
import express from "express";

/* this is to validate the input before processing  */
import {validator} from "../../middleware/validation.middleware";
import {loginSchema} from "./auth.schema";
import {registerSchema} from "./auth.schema";

export const authRouter = express.Router();

authRouter.post("/login",validator(loginSchema), login);
authRouter.post("/register",validator(registerSchema), register);
authRouter.post("/logout", logout);
authRouter.get("/me", me);