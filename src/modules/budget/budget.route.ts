import {updateBudget} from "./budget.controller";
import {getBudgetsController} from "./budget.controller";
import {createBudget} from "./budget.controller";
import {deleteBudget} from "./budget.controller";
import {validator} from "../../middleware/validation.middleware";
import {budgetSchema,budgetUpdateSchema} from "./budget.schema";
import {authMiddleware} from "../../middleware/auth.middleware";
import { errorHandler } from "../../middleware/error.middleware";
import express from "express";

export const budgetRouter = express.Router();
/* i will consider adding budget id as a url parameter or query string later */
budgetRouter.post("/create",validator(budgetSchema),authMiddleware, createBudget);
budgetRouter.get("/get",authMiddleware, getBudgetsController);
budgetRouter.patch("/update/:budgetId",validator(budgetUpdateSchema),authMiddleware, updateBudget);
budgetRouter.delete("/delete/:budgetId", authMiddleware, deleteBudget);