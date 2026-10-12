import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./error.middleware";
export function validator(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${String(issue.path[0])}: ${issue.message}`)
        .join(", ");

      next(new AppError(400, message));
      return;
    }
    /* because there may be transformation in the schema provided */
    req.body = result.data;
    next();
  };
}

export function paramsValidator(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${String(issue.path[0])}: ${issue.message}`)
      .join(", ");
    throw new AppError(400, message);
  }
  
  next();
}
}