import type { RequestHandler } from "express";
import {Request, Response, NextFunction} from "express";
import { AppError } from "./error.middleware";

export const authMiddleware: RequestHandler=(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.session.userId

    if(!userId){
        next(new AppError(401, "Unauthorized"));
        return;
    }
    next();
};