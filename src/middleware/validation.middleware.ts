import { Message } from './../../node_modules/esbuild/lib/main.d';
import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
export function validator(schema: ZodType){
    return (req: Request, res: Response, next: NextFunction): void => {
        const result= schema.safeParse(req.body);
            if(!result.success){
               res.status(400).json(result.error.issues.map((issue)=>{

                   return {
                    error:issue.message,
                    field:issue.path[0]
                    }
                    
                }))
            }
            /* because there may be transformation in the schema provided */
            req.body=result.data;
            next();
    }
}