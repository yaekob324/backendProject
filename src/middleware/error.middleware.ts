import type { ErrorRequestHandler } from "express";

export class AppError extends Error{
    public readonly statusCode:number;
    constructor(statusCode:number, message:string){
        super(message);
        this.statusCode=statusCode;
        this.name="AppError";
    }
    
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    if(res.headersSent){
        return next(err);
    }
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    return res.status(500).json({
        message: "Internal Server Error"
    });
}