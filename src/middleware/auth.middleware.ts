import type { RequestHandler } from "express";
import {Request, Response, NextFunction} from "express";

export const authMiddleware: RequestHandler=(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.session.userId

    if(!userId){
        res.status(401).json({
            message:"user unauthorized"
        })
        return;
    }
    next();
}